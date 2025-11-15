import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
    id: number;
    message: string;
    type: ToastType;
    duration: number; // ms
}

interface ToastState {
    toasts: Toast[];
    addToast: (message: string, type?: ToastType, duration?: number) => void;
    removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
    toasts: [],

    addToast: (message, type = "info", duration = 3000) => {
        const id = Date.now();
        set((state) => ({
            toasts: [...state.toasts, { id, message, type, duration }],
        }));

        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, duration);
    },

    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}));
