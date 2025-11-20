import { reactive } from 'vue'

export interface AuthStore {
	isLoggedIn: boolean
	stored_token?: string
	login(token: string): void
	logout(): void
}

export const authstore = reactive<AuthStore>({
	isLoggedIn: !!localStorage.getItem('access_token'),
	stored_token: localStorage.getItem('access_token') ?? undefined,

	login(token: string) {
		localStorage.setItem('access_token', token)
		this.stored_token = token
		this.isLoggedIn = true
	},
	logout() {
		localStorage.removeItem('access_token')
		this.stored_token = undefined
		this.isLoggedIn = false
	},
})
