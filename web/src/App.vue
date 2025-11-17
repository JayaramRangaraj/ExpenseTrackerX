<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container">
            <!-- Brand -->
            <router-link class="navbar-brand d-flex align-items-center" to="/">
                <span class="fw-semibold">MyApp</span>
            </router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarMenu">

                <!-- NOT LOGGED IN NAVBAR -->
                <ul v-if="!authStore.isLoggedIn" class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/" exact-active-class="active">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about" exact-active-class="active">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/contact" exact-active-class="active">Contact</router-link>
                    </li>
                </ul>

                <!-- LOGGED IN NAVBAR -->
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
                </ul>

                <!-- Right-aligned Buttons -->
                <div class="d-flex">

                    <!-- Show Login/Signup -->
                    <router-link 
                        v-if="!authStore.isLoggedIn"
                        to="/auth?mode=login" 
                        class="btn btn-outline-primary me-2"
                    >
                        Login
                    </router-link>

                    <router-link 
                        v-if="!authStore.isLoggedIn"
                        to="/auth?mode=signup" 
                        class="btn btn-primary"
                    >
                        Sign Up
                    </router-link>

                    <!-- Show Logout -->
                    <button 
                        v-if="authStore.isLoggedIn"
                        @click="handleLogout"
                        class="btn btn-danger"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </nav>
    <router-view />
</template>

<script setup>
import { authStore } from "@/services/auth";
import { useRouter } from "vue-router";

const router = useRouter();

function handleLogout() {
    authStore.logout();
    router.push("/");
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>
