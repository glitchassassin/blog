import { createRequestHandler } from '@react-router/architect'
// @ts-ignore (no types declared for build)
import * as build from '../build/server'

// Type for warming events from EventBridge
interface WarmingEvent {
	source: 'warming'
	action: 'ping'
}

const reactRouterHandler = createRequestHandler({
	build,
	mode: process.env.NODE_ENV,
})

// Derive types from reactRouterHandler and extend event to include WarmingEvent
type ReactRouterHandlerParams = Parameters<typeof reactRouterHandler>
type OriginalEvent = ReactRouterHandlerParams[0]
type HandlerEvent = OriginalEvent | WarmingEvent
type HandlerReturn = ReturnType<typeof reactRouterHandler>

export const handler = async (
	event: HandlerEvent,
	context: ReactRouterHandlerParams[1],
	callback: ReactRouterHandlerParams[2],
): Promise<HandlerReturn> => {
	// Ignore lambda warming events
	if ('source' in event) {
		console.log('🔥 Warming event received - keeping function warm')
		return
	}

	// Handle regular HTTP requests through React Router
	return await reactRouterHandler(event, context, callback)
}
