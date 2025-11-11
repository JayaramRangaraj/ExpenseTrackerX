import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css";
import BootstrapVue from "bootstrap-vue";

createApp(App).use(router).use(BootstrapVue).mount("#app");
