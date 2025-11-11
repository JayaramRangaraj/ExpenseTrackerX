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

    // Reactive form data
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const message = ref("");
    const isLoading = ref(false);

    // Submit Handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        isLoading.value = true;

        try {
            if (mode.value === "signup") {
                const payload = {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                };

                const res = await AuthService.signup(payload);
                message.value = res.data.message;
                setTimeout(() => {
                    name.value = "";
                    email.value = "";
                    password.value = "";
                }, 1000);
                setTimeout(() => {
                    message.value = "";
                }, 4000);
            } else {
                const payload = {
                    email: email.value,
                    password: password.value,
                };

                const res = await AuthService.login(payload);
                message.value = res.data.message;
            }
        } catch (err) {
            message.value = err.response?.data?.error || "An error occurred.";
        } finally {
            isLoading.value = false;
        }
    };
</script>
