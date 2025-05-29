import { useRouteError, isRouteErrorResponse } from 'react-router'
import { GenericErrorPage } from './GenericErrorPage'
import { NotFoundPage } from './NotFoundPage'

export function DefaultErrorBoundary() {
	const error = useRouteError()

	// For 404 errors, show the NotFoundPage
	if (isRouteErrorResponse(error) && error.status === 404) {
		return <NotFoundPage />
	}

	// For other errors, show a generic error page
	return <GenericErrorPage />
}
