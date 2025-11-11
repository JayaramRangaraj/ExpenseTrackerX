import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthService = {
  signup(data) {
    console.log("Inside signup");
    return apiClient.post("/auth/signup", data);
  },

  login(data) {
    console.log("Inside login");
    return apiClient.post("/auth/login", data);
  },
};
