import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AuthService } from "@/services/api";
import { authStore } from "@/services/auth";
import { parseError } from "@/utils/errorParser";

export function useAuthLogic() {
	const route = useRoute();
	const router = useRouter();

	const mode = computed(() => route.query.mode || "login");

	//Form State
	const name = ref("");
	const email = ref("");
	const password = ref("");
	const message = ref("");
	const isError = ref(false);
	const isLoading = ref(false);

	const createPayload = () => {
		return mode.value === "signup"
			? { name: name.value, email: email.value, password: password.value }
			: { email: email.value, password: password.value };
	};

	const callApi = async (payload) => {
		if (mode.value === "signup") {
			return await AuthService.signup(payload);
		}
		return await AuthService.login(payload);
	};

	const validateResponse = (res) => {
		if (!res.data?.access_token) {
			throw new Error("Invalid server response: missing token");
		}
	};
	const handleSuccess = (res) => {
		message.value = res.data.msg || "Success!";
		isError.value = false;

		// Clear form
		name.value = "";
		email.value = "";
		password.value = "";

		// Login global state
		authStore.login(res.data.access_token);

		// Store refresh token
		localStorage.setItem("refresh_token", res.data.refresh_token);

		// Redirect last
		router.push("/dashboard");
	};

	const handleError = (err) => {
		message.value = parseError(err);
		isError.value = true;

		// Rollback login (prevent partial login)
		authStore.logout?.();
		localStorage.removeItem("refresh_token");
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		isLoading.value = true;
		isError.value = false;
		message.value = "";

		try {
			const payload = createPayload();
			const res = await callApi(payload);

			validateResponse(res);
			handleSuccess(res);
		} catch (err) {
			handleError(err);
		} finally {
			isLoading.value = false;
		}
	};

	return {
		mode,
		name,
		email,
		password,
		message,
		isError,
		isLoading,
		handleSubmit,
	};
}
