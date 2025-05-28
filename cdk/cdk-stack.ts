import * as path from 'path'
import { fileURLToPath } from 'url'
import * as cdk from 'aws-cdk-lib'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53targets from 'aws-cdk-lib/aws-route53-targets'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import { type Construct } from 'constructs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export class CdkStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props)

		// Set absolute path to the lambda.ts handler
		const entry = path.join(__dirname, '../server/lambda.ts')

		// Create Lambda function for React Router
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
			},
		)

		// Create Function URL for the Lambda
		const functionUrl = lambdaFunction.addFunctionUrl({
			authType: lambda.FunctionUrlAuthType.NONE,
		})

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
				cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
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
			distributionPaths: ['/assets/*'],
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

		new cdk.CfnOutput(this, 'DistributionDomainName', {
			value: distribution.domainName,
		})
	}
}
