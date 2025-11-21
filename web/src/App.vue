<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { BApp } from 'bootstrap-vue-next'
import { authstore } from '@/services/auth'

function handleLogout() {
	authstore.logout()
}
</script>

<template>
	<BApp>
		<header>
			<nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
				<div class="container">
					<router-link class="navbar-brand" to="/">
						<span class="fw-semibold">MyApp</span>
					</router-link>

					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarMenu"
					>
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="collapse navbar-collapse" id="navbarMenu">
						<!-- NOT LOGGED IN NAV -->
						<ul v-if="!authstore.isLoggedIn" class="navbar-nav ms-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<router-link class="nav-link" to="/">Home</router-link>
							</li>

							<li class="nav-item">
								<router-link class="nav-link" to="/about">About</router-link>
							</li>

							<li class="nav-item">
								<router-link class="nav-link" to="/contact">Contact</router-link>
							</li>

							<div class="d-flex">
								<router-link to="/auth?mode=login" class="btn btn-outline-primary me-2">
									Login
								</router-link>
								<router-link to="/auth?mode=signup" class="btn btn-primary">Sign Up</router-link>
							</div>
						</ul>

						<!-- LOGGED IN NAV -->
						<ul v-else class="navbar-nav ms-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<router-link class="nav-link" to="/dashboard">Dashboard</router-link>
							</li>

							<li class="nav-item">
								<router-link class="nav-link" to="/expenses">Expenses</router-link>
							</li>

							<li class="nav-item">
								<router-link class="nav-link" to="/profile">Profile</router-link>
							</li>

							<button @click="handleLogout" class="btn btn-danger ms-3">Logout</button>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	</BApp>

	<RouterView />
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
}
</style>
