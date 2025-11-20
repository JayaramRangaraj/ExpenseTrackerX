import { ref, computed, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { AuthServices } from '@/services/api'
import { authstore } from '@/services/auth'
import { parseError } from '@/utils/errorParser' // FIX: Needed import

interface UseAuthentication {
	mode: Ref<string>
	name: Ref<string>
	email: Ref<string>
	password: Ref<string>
	message: Ref<string>
	isError: Ref<boolean>
	isLoading: Ref<boolean>
	handleSubmit: (event: Event) => Promise<void> // FIX: Missing return type
}

interface PayLoad {
	name?: string
	email: string
	password: string
}

export function useAuthentication(): UseAuthentication {
	const route = useRoute()
	const router = useRouter()

	const mode = computed(() => (route.query.mode as string) || 'login')

	const name = ref('')
	const email = ref('')
	const password = ref('')
	const message = ref('')
	const isError = ref(false)
	const isLoading = ref(false)

	/** Build payload with correct type */
	const buildPayLoad = (): PayLoad => {
		return mode.value === 'signup'
			? { name: name.value, email: email.value, password: password.value }
			: { email: email.value, password: password.value }
	}

	/** Submit login/signup request */
	const submitAuthRequest = async (payload: PayLoad) => {
		return mode.value === 'signup'
			? await AuthServices.signup(payload)
			: await AuthServices.login(payload)
	}

	/** Validate server response shape */
	const assertValidResponse = (res: any): void => {
		if (!res?.data?.access_token) {
			throw new Error('Invalid server response: missing token')
		}
	}

	/** Handle success */
	const onAuthSuccess = (res: any) => {
		message.value = res.data.msg || 'Success!'
		isError.value = false

		// Clear form
		name.value = ''
		email.value = ''
		password.value = ''

		// Login state
		authstore.login(res.data.access_token)

		// Store refresh token
		localStorage.setItem('refresh_token', res.data.refresh_token)

		// Redirect FIX: use router, not route.push
		router.push('/')
	}

	/** Handle error */
	const onAuthError = (err: any) => {
		message.value = parseError(err)
		isError.value = true

		authstore.logout?.()
		localStorage.removeItem('refresh_token')
	}

	/** Form submit handler */
	const handleSubmit = async (event: Event): Promise<void> => {
		event.preventDefault()
		isLoading.value = true
		isError.value = false
		message.value = ''

		try {
			const payload = buildPayLoad()
			const res = await submitAuthRequest(payload)

			assertValidResponse(res)
			onAuthSuccess(res)
		} catch (err) {
			onAuthError(err)
		} finally {
			isLoading.value = false
		}
	}

	return {
		mode,
		name,
		email,
		password,
		message,
		isError,
		isLoading,
		handleSubmit,
	}
}
