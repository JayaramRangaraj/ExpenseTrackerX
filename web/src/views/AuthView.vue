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
                    <input v-model="password" type="password" placeholder="Password" class="form-control mb-4" />

                    <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="isLoading">
                        {{ isLoading ? 'Processing...' : mode === 'signup' ? 'Sign Up' : 'Login' }}
                    </button>

                    <p class="text-success">{{ message }}</p>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { AuthService } from "@/services/api";

const route = useRoute();
const mode = computed(() => route.query.mode || "login");

// Reactive state
const name = ref("");
const email = ref("");
const password = ref("");
const message = ref("");
const isError = ref(false);
const isLoading = ref(false);

// Submit Handler
const handleSubmit = async (event) => {
    event.preventDefault();
    isLoading.value = true;
    message.value = "";
    isError.value = false;

    try {
        let res;
        if (mode.value === "signup") {
            const payload = { name: name.value, email: email.value, password: password.value };
            res = await AuthService.signup(payload);
        } else {
            const payload = { email: email.value, password: password.value };
            res = await AuthService.login(payload);
        }

        // ✅ Success
        
        message.value = res.data.msg || "Success!";
        isError.value = false;
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);

        

        // Clear inputs after success
        name.value = "";
        email.value = "";
        password.value = "";

    } catch (err) {
        // ❌ Error
        const res = err.response?.data;
        if (res?.errors) {
            // Show first validation error
            const firstErrorField = Object.keys(res.errors)[0];
            message.value = res.errors[firstErrorField][0];
        } else {
            message.value = res?.msg || "An unexpected error occurred.";
        }
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};

</script>
