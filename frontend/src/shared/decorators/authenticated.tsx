import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/core/store/auth.store";
import type { DecoratorProps } from "../types/decorators";
import { api } from "../api";

export function Authenticated({ children }: DecoratorProps) {
    const {
        isAuth,
        access,
        setAuth,
        setAuthField,
        clearAuth,
    } = useAuthStore();

    useEffect(() => {
        let ignore = false;

        async function verify() {
            setAuthField("isAuthLoading", true);

            if (isAuth && access) {
                setAuthField("isAuthLoading", false);
                setAuthField("authChecked", true);
                return;
            }

            try {
                const refreshRes = await api.post("/auth/refresh", {}, { withCredentials: true });

                const newAccess = refreshRes.data.access;

                const meRes = await api.get("/auth/me", {
                    headers: { Authorization: `Bearer ${newAccess}` }
                });

                if (!ignore) {
                    setAuth(newAccess, meRes.data);
                    setAuthField("authChecked", true);
                }
            } catch {
                if (!ignore) {
                    clearAuth();
                    setAuthField("authChecked", true);
                }
            } finally {
                if (!ignore) {
                    setAuthField("isAuthLoading", false);
                }
            }
        }

        verify();
        return () => { ignore = true };
    }, [isAuth, access, setAuth, setAuthField, clearAuth]);

    const { authChecked, isAuthLoading } = useAuthStore.getState();

    if (!authChecked || isAuthLoading) 
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    if (!isAuth) return <Navigate to="/auth/signin" replace />;

    return children;
}
