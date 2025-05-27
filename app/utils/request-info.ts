import { useRouteLoaderData } from 'react-router'

export function useRequestInfo() {
	const data = useRouteLoaderData('root')
	if (!data || typeof data !== 'object') {
		throw new Error(
			'useRequestInfo can only be used inside routes where root loader data is available',
		)
	}

	if (!('requestInfo' in data)) {
		throw new Error(
			'Root loader must provide requestInfo in order to use useRequestInfo',
		)
	}

	return data.requestInfo as {
		hints: Record<string, any>
		// Add other request info properties as needed
	}
}
