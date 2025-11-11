<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container">
            <!-- Brand -->
            <router-link class="navbar-brand d-flex align-items-center" to="/">
                <span class="fw-semibold">MyApp</span>
            </router-link>

            <!-- Toggler -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- Menu -->
            <div class="collapse navbar-collapse" id="navbarMenu">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
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

                <!-- Right-aligned Buttons -->
                <div class="d-flex">
                    <router-link to="/auth?mode=login" class="btn btn-outline-primary me-2">Login</router-link>
                    <router-link to="/auth?mode=signup" class="btn btn-primary">Sign Up</router-link>
                </div>
            </div>
        </div>
    </nav>
    <router-view />
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
    }
</style>
