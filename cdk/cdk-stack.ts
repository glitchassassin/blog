import * as path from 'path'
import { fileURLToPath } from 'url'
import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch'
import * as cloudwatchActions from 'aws-cdk-lib/aws-cloudwatch-actions'
import * as events from 'aws-cdk-lib/aws-events'
import * as targets from 'aws-cdk-lib/aws-events-targets'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as logs from 'aws-cdk-lib/aws-logs'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53targets from 'aws-cdk-lib/aws-route53-targets'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import * as sns from 'aws-cdk-lib/aws-sns'
import { type Construct } from 'constructs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class CdkStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		// Set absolute path to the lambda.ts handler
		const entry = path.join(__dirname, '../server/lambda.ts')

		// Create custom log group for Lambda function
		const lambdaLogGroup = new logs.LogGroup(this, 'LambdaLogGroup', {
			logGroupName: '/aws/lambda/ReactRouterHandler',
			retention: logs.RetentionDays.ONE_MONTH,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
		})

		// Create Lambda function for React Router with Lambda Insights enabled
		const lambdaFunction = new nodejs.NodejsFunction(
			this,
			'ReactRouterHandler',
			{
				runtime: lambda.Runtime.NODEJS_22_X,
				handler: 'handler',
				entry,
				bundling: {
					externalModules: [
						'@aws-sdk/*',
						'aws-sdk', // Not actually needed (or provided): https://github.com/remix-run/react-router/issues/13341
					],
					minify: true,
					sourceMap: true,
					target: 'es2022',
				},
				environment: {
					NODE_ENV: 'production',
				},
				insightsVersion: lambda.LambdaInsightsVersion.VERSION_1_0_333_0,
				logGroup: lambdaLogGroup,
			},
		)

		// Create Function URL for the Lambda
		const functionUrl = lambdaFunction.addFunctionUrl({
			authType: lambda.FunctionUrlAuthType.NONE,
		})

		const warmingRule = new events.Rule(this, 'WarmingRule', {
			schedule: events.Schedule.rate(cdk.Duration.minutes(5)), // Ping every 5 minutes
			description: 'Keep Lambda function warm',
		})

		warmingRule.addTarget(
			new targets.LambdaFunction(lambdaFunction, {
				event: events.RuleTargetInput.fromObject({
					source: 'warming',
					action: 'ping',
				}),
			}),
		)

		// Create S3 bucket for static assets
		const staticBucket = new s3.Bucket(this, 'StaticBucket', {
			enforceSSL: true,
			publicReadAccess: false,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
			removalPolicy: cdk.RemovalPolicy.DESTROY,
			autoDeleteObjects: true,
		})

		// Look up the hosted zone
		const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
			domainName: 'jonwinsley.com',
		})

		// Create SSL certificate (must be in us-east-1 for CloudFront)
		const certificate = new acm.Certificate(this, 'Certificate', {
			domainName: 'jonwinsley.com',
			subjectAlternativeNames: ['www.jonwinsley.com'],
			validation: acm.CertificateValidation.fromDns(hostedZone),
			certificateName: 'jonwinsley-com-cert',
		})

		// Create CloudFront function to handle www redirect
		const wwwRedirectFunction = new cloudfront.Function(
			this,
			'WwwRedirectFunction',
			{
				code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
	var request = event.request;
	var headers = request.headers;
	
	// Check if the host is www.jonwinsley.com and redirect to jonwinsley.com
	if (headers.host.value === 'www.jonwinsley.com') {
		var queryString = '';
		if (request.querystring && Object.keys(request.querystring).length > 0) {
			var params = [];
			for (var key in request.querystring) {
				if (request.querystring[key].value) {
					params.push(key + '=' + encodeURIComponent(request.querystring[key].value));
				} else {
					params.push(key);
				}
			}
			queryString = '?' + params.join('&');
		}
		
		return {
			statusCode: 301,
			statusDescription: 'Moved Permanently',
			headers: {
				'location': {
					value: 'https://jonwinsley.com' + request.uri + queryString
				}
			}
		};
	}
	
	// Add X-Forwarded-Host header with the CloudFront host for non-www requests
	headers['x-forwarded-host'] = {value: headers.host.value};
	
	return request;
}
				`),
				comment:
					'Redirects www.jonwinsley.com to jonwinsley.com and adds forwarded headers',
			},
		)

		// Create custom cache policy for Lambda responses (aggressive caching)
		const lambdaCachePolicy = new cloudfront.CachePolicy(
			this,
			'LambdaCachePolicy',
			{
				cachePolicyName: 'LambdaAggressiveCaching',
				comment:
					'Aggressive caching policy for Lambda responses serving static content',
				defaultTtl: cdk.Duration.days(1), // Cache for 1 day by default
				maxTtl: cdk.Duration.days(30), // Maximum cache time of 30 days
				minTtl: cdk.Duration.minutes(5), // Minimum cache time of 5 minutes
				enableAcceptEncodingGzip: true,
				enableAcceptEncodingBrotli: true,
				headerBehavior: cloudfront.CacheHeaderBehavior.allowList(
					'Accept',
					'Accept-Language',
					'User-Agent',
				),
				queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
				cookieBehavior: cloudfront.CacheCookieBehavior.none(),
			},
		)

		// Create CloudFront distribution
		const distribution = new cloudfront.Distribution(this, 'Distribution', {
			domainNames: ['jonwinsley.com', 'www.jonwinsley.com'],
			certificate,
			defaultBehavior: {
				origin: new origins.FunctionUrlOrigin(functionUrl),
				viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
				cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
				originRequestPolicy:
					cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
				cachePolicy: lambdaCachePolicy,
				functionAssociations: [
					{
						function: wwwRedirectFunction,
						eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
					},
				],
			},
			additionalBehaviors: {
				'/assets/*': {
					origin: origins.S3BucketOrigin.withOriginAccessControl(staticBucket, {
						originAccessLevels: [
							cloudfront.AccessLevel.READ,
							cloudfront.AccessLevel.LIST,
						],
					}),
					viewerProtocolPolicy:
						cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
					allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
					cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
					cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
				},
			},
		})

		// Deploy static assets to S3
		new s3deploy.BucketDeployment(this, 'DeployStaticAssets', {
			sources: [
				s3deploy.Source.asset(path.join(__dirname, '../build/client/assets')),
			],
			destinationBucket: staticBucket,
			destinationKeyPrefix: 'assets',
			distribution,
			distributionPaths: ['/assets/*', '/*'], // Invalidate both assets and all paths
			memoryLimit: 256,
		})

		// Create Route53 A record pointing to CloudFront
		new route53.ARecord(this, 'AliasRecord', {
			zone: hostedZone,
			recordName: 'jonwinsley.com',
			target: route53.RecordTarget.fromAlias(
				new route53targets.CloudFrontTarget(distribution),
			),
		})

		// Create Route53 A record for www subdomain pointing to the same CloudFront distribution
		new route53.ARecord(this, 'WwwAliasRecord', {
			zone: hostedZone,
			recordName: 'www.jonwinsley.com',
			target: route53.RecordTarget.fromAlias(
				new route53targets.CloudFrontTarget(distribution),
			),
		})

		// ====== MONITORING SETUP ======

		// Create SNS topic for performance alerts
		const alertTopic = new sns.Topic(this, 'PerformanceAlerts', {
			displayName: 'Blog Performance Alerts',
		})

		// Create CloudWatch Dashboard
		const dashboard = new cloudwatch.Dashboard(this, 'PerformanceDashboard', {
			dashboardName: 'Blog-Performance-Monitoring',
		})

		// Define Lambda metrics
		const lambdaDuration = lambdaFunction.metricDuration({
			statistic: 'Average',
			period: cdk.Duration.minutes(5),
		})
		const lambdaInvocations = lambdaFunction.metricInvocations({
			period: cdk.Duration.minutes(5),
		})
		const lambdaErrors = lambdaFunction.metricErrors({
			period: cdk.Duration.minutes(5),
		})
		const lambdaThrottles = lambdaFunction.metricThrottles({
			period: cdk.Duration.minutes(5),
		})

		// Define CloudFront metrics
		const cloudFrontRequests = new cloudwatch.Metric({
			namespace: 'AWS/CloudFront',
			metricName: 'Requests',
			dimensionsMap: {
				DistributionId: distribution.distributionId,
			},
			statistic: 'Sum',
			period: cdk.Duration.minutes(5),
		})

		const cloudFrontOriginLatency = new cloudwatch.Metric({
			namespace: 'AWS/CloudFront',
			metricName: 'OriginLatency',
			dimensionsMap: {
				DistributionId: distribution.distributionId,
			},
			statistic: 'Average',
			period: cdk.Duration.minutes(5),
		})

		const cloudFront4xxErrors = new cloudwatch.Metric({
			namespace: 'AWS/CloudFront',
			metricName: '4xxErrorRate',
			dimensionsMap: {
				DistributionId: distribution.distributionId,
			},
			statistic: 'Average',
			period: cdk.Duration.minutes(5),
		})

		const cloudFront5xxErrors = new cloudwatch.Metric({
			namespace: 'AWS/CloudFront',
			metricName: '5xxErrorRate',
			dimensionsMap: {
				DistributionId: distribution.distributionId,
			},
			statistic: 'Average',
			period: cdk.Duration.minutes(5),
		})

		// Add widgets to dashboard
		dashboard.addWidgets(
			new cloudwatch.GraphWidget({
				title: 'Lambda Performance',
				left: [lambdaDuration, lambdaInvocations],
				right: [lambdaErrors, lambdaThrottles],
				width: 12,
				height: 6,
			}),
			new cloudwatch.GraphWidget({
				title: 'CloudFront Performance',
				left: [cloudFrontRequests, cloudFrontOriginLatency],
				right: [cloudFront4xxErrors, cloudFront5xxErrors],
				width: 12,
				height: 6,
			}),
		)

		// Create performance alarms

		// Lambda high latency alarm (> 3 seconds average)
		const highLatencyAlarm = new cloudwatch.Alarm(this, 'HighLatencyAlarm', {
			metric: lambdaDuration,
			threshold: 3000, // 3 seconds in milliseconds
			evaluationPeriods: 2,
			datapointsToAlarm: 2,
			treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
			alarmDescription: 'Lambda function average latency is above 3 seconds',
			alarmName: 'Blog-Lambda-HighLatency',
		})
		highLatencyAlarm.addAlarmAction(new cloudwatchActions.SnsAction(alertTopic))

		// Lambda high error rate alarm (> 5 errors in 10 minutes)
		const highErrorRateAlarm = new cloudwatch.Alarm(
			this,
			'HighErrorRateAlarm',
			{
				metric: lambdaErrors,
				threshold: 5,
				evaluationPeriods: 2,
				datapointsToAlarm: 1,
				treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
				alarmDescription:
					'Lambda function error count is above 5 in 10 minutes',
				alarmName: 'Blog-Lambda-HighErrors',
			},
		)
		highErrorRateAlarm.addAlarmAction(
			new cloudwatchActions.SnsAction(alertTopic),
		)

		// Lambda throttling alarm
		const throttleAlarm = new cloudwatch.Alarm(this, 'ThrottleAlarm', {
			metric: lambdaThrottles,
			threshold: 1,
			evaluationPeriods: 1,
			treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
			alarmDescription: 'Lambda function is being throttled',
			alarmName: 'Blog-Lambda-Throttles',
		})
		throttleAlarm.addAlarmAction(new cloudwatchActions.SnsAction(alertTopic))

		// CloudFront high error rate alarm (> 5% 5xx errors)
		const cloudFrontErrorAlarm = new cloudwatch.Alarm(
			this,
			'CloudFrontErrorAlarm',
			{
				metric: cloudFront5xxErrors,
				threshold: 5, // 5% error rate
				evaluationPeriods: 2,
				datapointsToAlarm: 2,
				treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
				alarmDescription: 'CloudFront 5xx error rate is above 5%',
				alarmName: 'Blog-CloudFront-HighErrors',
			},
		)
		cloudFrontErrorAlarm.addAlarmAction(
			new cloudwatchActions.SnsAction(alertTopic),
		)

		// CloudFront high origin latency alarm (> 5 seconds)
		const cloudFrontLatencyAlarm = new cloudwatch.Alarm(
			this,
			'CloudFrontLatencyAlarm',
			{
				metric: cloudFrontOriginLatency,
				threshold: 5000, // 5 seconds in milliseconds
				evaluationPeriods: 3,
				datapointsToAlarm: 2,
				treatMissingData: cloudwatch.TreatMissingData.NOT_BREACHING,
				alarmDescription: 'CloudFront origin latency is above 5 seconds',
				alarmName: 'Blog-CloudFront-HighLatency',
			},
		)
		cloudFrontLatencyAlarm.addAlarmAction(
			new cloudwatchActions.SnsAction(alertTopic),
		)

		// Output useful information
		new cdk.CfnOutput(this, 'DistributionDomainName', {
			value: distribution.domainName,
		})

		new cdk.CfnOutput(this, 'DashboardUrl', {
			value: `https://${this.region}.console.aws.amazon.com/cloudwatch/home?region=${this.region}#dashboards:name=Blog-Performance-Monitoring`,
			description: 'CloudWatch Dashboard URL',
		})

		new cdk.CfnOutput(this, 'SNSTopicArn', {
			value: alertTopic.topicArn,
			description: 'SNS Topic ARN for performance alerts',
		})
	}
}
