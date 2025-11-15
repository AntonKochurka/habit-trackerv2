import { useAuthStore } from "@/core/store/auth.store";
import type { DecoratorProps } from "../types/decorators";
import { Navigate } from "react-router-dom";
import { useToastStore } from "@/core/store/toast.store";
import { useEffect, useRef } from "react";

export function Authenticated({ children }: DecoratorProps) {
    const { isAuth } = useAuthStore();
    const addToast = useToastStore((state) => state.addToast);
    const toastShownRef = useRef(false);

    useEffect(() => {
        if (!isAuth && !toastShownRef.current) {
            addToast("Please, log in first.", "warning");
            toastShownRef.current = true;
        }
    }, [isAuth, addToast]);

    if (!isAuth) {
        return <Navigate to={"/auth/signin"} replace />;
    }

    return children;
}