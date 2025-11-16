import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/core/store/auth.store";
import { useToastStore } from "@/core/store";
import { env } from "@/core/config/env";
import { normalizeApiError } from "./errors";

export const api = axios.create({
    baseURL: env.API_URL,
    timeout: 10000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().access;
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const toast = useToastStore.getState();
        const auth = useAuthStore.getState();

        const normalized = normalizeApiError(error);

        const status = normalized.status;
        
        if (status === 401) {
            auth.clearAuth();
            toast.addToast("Session expired. Please login again.", "error");
        } else if (status && status >= 400 && status < 500) {
        } else if (status === null) {
        } else {
            toast.addToast("Server error. Try again later.", "error");
        }

        return Promise.reject(error);
    }
);