import type { UserModel } from "@/shared/types/in_db";
import { create } from "zustand";

interface AuthState {
    access: string | null;
    isAuth: boolean;
    user: UserModel | null;

    setAuth: (token: string, user: UserModel) => void;
    setAuthField: <K extends keyof AuthState>(key: K, value: AuthState[K]) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    access: null,
    isAuth: false,
    user: null,

    setAuth: (token, user) =>
        set({
            access: token,
            isAuth: true,
            user,
        }),

    setAuthField: (key, value) =>
        set((state) => ({
            ...state,
            [key]: value
        })),

    clearAuth: () =>
        set({
            access: null,
            isAuth: false,
            user: null,
        }),
}));
