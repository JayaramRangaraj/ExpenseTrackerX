import type { AxiosError } from 'axios'

export function parseError(err: unknown): string {
	const error = err as AxiosError<any>

	const res = error.response?.data

	// ---------------- BACKEND VALIDATION ERRORS (Marshmallow) ----------------
	if (res?.errors && typeof res.errors === 'object') {
		const errors = res.errors as Record<string, string[]> // FIX: Typed dictionary

		const firstField = Object.keys(errors)[0]

		if (firstField && Array.isArray(errors[firstField])) {
			return errors[firstField][0] // SAFE
		}
	}

	// ---------------- SIMPLE BACKEND MESSAGE ----------------
	if (res?.msg && typeof res.msg === 'string') {
		return res.msg
	}

	// ---------------- NETWORK ERROR (Axios) ----------------
	if (error.message === 'Network Error') {
		return 'Unable to reach server. Please check your connection.'
	}

	// ---------------- TIMEOUT ERROR (Axios) ----------------
	if (error.code === 'ECONNABORTED') {
		return 'Request timed out. Try again.'
	}

	return 'An unexpected error occurred.'
}
