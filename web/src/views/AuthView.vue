<template>
  <div class="auth-page">
    <div class="container-md p-4">
      <div class="auth-box text-center">
        <h2 class="mb-4">
          {{ mode === 'signup' ? 'Create an Account' : 'Login to Your Account' }}
        </h2>

        <form >
          <div v-if="mode === 'signup'">
            <input type="text" placeholder="Full Name" class="form-control mb-3" />
          </div>

          <input type="email" placeholder="Email" class="form-control mb-3" />
          <input type="password" placeholder="Password" class="form-control mb-4" />

          <button class="btn btn-primary w-100 mb-3">
            {{ mode === 'signup' ? 'Sign Up' : 'Login' }}
          </button>

          <router-link
            :to="mode === 'signup' ? '/auth?mode=login' : '/auth?mode=signup'"
            class="text-decoration-none small"
          >
            {{ mode === 'signup' ? 'Already have an account? Login' : "Don't have an account? Sign Up" }}
          </router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mode = computed(() => route.query.mode || 'login')
</script>
