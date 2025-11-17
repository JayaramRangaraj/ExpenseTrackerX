import { reactive } from "vue";

export const authStore = reactive({
  isLoggedIn: !!localStorage.getItem("access_token"),

  login(token) {
    localStorage.setItem("access_token", token);
    this.isLoggedIn = true;
  },

  logout() {
    localStorage.removeItem("access_token");
    this.isLoggedIn = false;
  },
});
