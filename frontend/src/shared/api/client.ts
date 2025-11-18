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

const refreshApi = axios.create({
    baseURL: env.API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
});

let refreshPromise: Promise<string | null> | null = null;

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().access;
        if (token)
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const auth = useAuthStore.getState();
        const toast = useToastStore.getState();

        if (!error?.config) return Promise.reject(error);

        const normalized = normalizeApiError(error);
        const status = normalized.status ?? error.response?.status ?? null;

        if (status !== 401 || normalized.message !== "Token has expired")
            return Promise.reject(error);

        if (!refreshPromise) {
            useAuthStore.getState().setAuthField("isRefreshing", true);

            refreshPromise = refreshApi
                .post("/auth/refresh", {})
                .then((res) => res?.data?.access ?? null)
                .finally(() => {
                    useAuthStore.getState().setAuthField("isRefreshing", false);
                });
        }

        const newAccess = await refreshPromise;

        if (!newAccess) {
            refreshPromise = null;
            auth.clearAuth();
            toast.addToast("Session expired. Please login again.", "error");
            return Promise.reject(error);
        }

        useAuthStore.getState().setAuthField("access", newAccess);

        const retryConfig = {
            ...error.config,
            headers: {
                ...(error.config.headers || {}),
                Authorization: `Bearer ${newAccess}`
            }
        };

        refreshPromise = null;

        return api.request(retryConfig);
    }
);
