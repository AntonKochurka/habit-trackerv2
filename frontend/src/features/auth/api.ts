import { useMutation } from "@tanstack/react-query";
import type { SignInRequest, SignUpRequest } from "./types";
import { api, normalizeApiError } from "@/shared/api";
import { useAuthStore, useToastStore } from "@/core/store";
import type { UserModel } from "@/shared/types/in_db";

export async function signIn(data: SignInRequest) {
    const res = await api.post("/auth/obtain", data);
    return res.data;
}

export async function fetchCurrentUser(accessToken: string) {
    const userRes = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    return userRes.data as UserModel;
}

export async function signUp(data: SignUpRequest) {
    const userRes = await api.post("/users/", data);
    const loginRes = await api.post("/auth/obtain", {
        username: data.username,
        password: data.password
    });
    return { tokens: loginRes.data, createdUser: userRes.data as UserModel };
}

export function useSignInMutation() {
    const auth = useAuthStore();
    const toast = useToastStore();

    return useMutation({
        mutationFn: (data: SignInRequest) => signIn(data),
        onSuccess: async (tokens) => {
            auth.setAuthField("access", tokens.access);
            auth.setAuthField("isAuth", true);

            try {
                const user = await fetchCurrentUser(tokens.access);
                auth.setAuthField("user", user);
                toast.addToast("Welcome back!", "success");
            } catch {
                auth.setAuthField("user", null);
                toast.addToast("Failed to fetch user data", "error");
            }
        },
        onError: (err: any) => {
            const message = normalizeApiError(err).message;
            toast.addToast(message, "error");
        },
        retry: false
    });
}

export function useSignUpMutation() {
    const auth = useAuthStore();
    const toast = useToastStore();

    return useMutation({
        mutationFn: (data: SignUpRequest) => signUp(data),
        onSuccess: async ({ tokens, createdUser }) => {
            auth.setAuthField("access", tokens.access);
            auth.setAuthField("isAuth", true);
            auth.setAuthField("user", createdUser);
            toast.addToast("Account created", "success");
        },
        onError: (err: any) => {
            const message = normalizeApiError(err).message;
            toast.addToast(message, "error");
        },
        retry: false
    });
}
