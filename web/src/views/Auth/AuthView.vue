<template>
	<div class="auth-page">
		<div class="container-md p-4">
			<div class="auth-box text-center">
				<h2 class="mb-4">
					{{ mode === 'signup' ? 'Create an Account' : 'Login to Your Account' }}
				</h2>

				<form @submit="handleSubmit">
					<div v-if="mode === 'signup'">
						<input v-model="name" type="text" placeholder="Full Name" class="form-control mb-3" />
					</div>

					<input v-model="email" type="email" placeholder="Email" class="form-control mb-3" />
					<input
						v-model="password"
						type="password"
						placeholder="Password"
						class="form-control mb-4"
					/>

					<button type="submit" class="btn btn-primary w-100 mb-3" :disabled="isLoading">
						{{ isLoading ? 'Processing...' : mode === 'signup' ? 'Sign Up' : 'Login' }}
					</button>

					<p :class="isError ? 'text-danger' : 'text-success'">{{ message }}</p>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthentication } from './useAuthentication.ts'

const { mode, name, email, password, message, isError, isLoading, handleSubmit } =
	useAuthentication()
</script>
