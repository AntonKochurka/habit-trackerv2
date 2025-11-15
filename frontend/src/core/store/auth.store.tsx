import type { UserModel } from "@/shared/types/in_db";
import { create } from "zustand";

interface AuthState {
    access: string | null;
    isAuth: boolean;
    user: UserModel | null;

    setAuth: (token: string, user: UserModel) => void;
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

    clearAuth: () =>
        set({
            access: null,
            isAuth: false,
            user: null,
        }),
}));
