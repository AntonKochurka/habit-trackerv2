import { type ReactNode, useState, useEffect } from "react";
import { useToastStore } from "@/core/store";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";

interface ToastProviderProps {
    children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
    const toasts = useToastStore((state) => state.toasts);
    const removeToast = useToastStore((state) => state.removeToast);
    const [exitingToasts, setExitingToasts] = useState<Set<number>>(new Set());

    useEffect(() => {
        toasts.forEach((toast) => {
            if (!exitingToasts.has(toast.id)) {
                const timer = setTimeout(() => {
                    handleRemoveToast(toast.id);
                }, toast.duration);

                return () => clearTimeout(timer);
            }
        });
    }, [toasts, exitingToasts]);

    const handleRemoveToast = (id: number) => {
        if (exitingToasts.has(id)) return;
        
        setExitingToasts(prev => new Set(prev).add(id));
        setTimeout(() => {
            removeToast(id);
            setExitingToasts(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }, 300);
    };

    const toastConfig = {
        success: { 
            bg: "bg-green-50 dark:bg-green-900/20",
            border: "border-green-200 dark:border-green-800",
            icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
            text: "text-green-800 dark:text-green-200",
            progress: "bg-green-500 dark:bg-green-400"
        },
        error: { 
            bg: "bg-red-50 dark:bg-red-900/20",
            border: "border-red-200 dark:border-red-800",
            icon: <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
            text: "text-red-800 dark:text-red-200",
            progress: "bg-red-500 dark:bg-red-400"
        },
        warning: { 
            bg: "bg-yellow-50 dark:bg-yellow-900/20",
            border: "border-yellow-200 dark:border-yellow-800",
            icon: <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
            text: "text-yellow-800 dark:text-yellow-200",
            progress: "bg-yellow-500 dark:bg-yellow-400"
        },
        info: { 
            bg: "bg-blue-50 dark:bg-blue-900/20",
            border: "border-blue-200 dark:border-blue-800",
            icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
            text: "text-blue-800 dark:text-blue-200",
            progress: "bg-blue-500 dark:bg-blue-400"
        },
    };

    return (
        <>
            {children}
            <div className="fixed top-5 right-5 flex flex-col gap-3 z-50">
                {toasts.map((toast) => {
                    const config = toastConfig[toast.type];
                    const isExiting = exitingToasts.has(toast.id);
                    
                    return (
                        <div
                            key={toast.id}
                            className={`
                                relative max-w-sm transform transition-all duration-300 ease-in-out
                                ${isExiting 
                                    ? 'animate-slide-out-right' 
                                    : 'animate-slide-in-right'
                                }
                            `}
                        >
                            <div className={`
                                flex items-start gap-3 p-4 rounded-2xl shadow-lg backdrop-blur-sm
                                ${config.bg} ${config.border} border
                                relative overflow-hidden
                            `}>
                                <div className={`absolute inset-0 ${config.bg.replace('bg-', 'from-').split(' ')[0]} opacity-10`} />
                                
                                <div className="shrink-0 mt-0.5">{config.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium leading-5 ${config.text}`}>
                                        {toast.message}
                                    </p>
                                </div>
                                <button
                                    onClick={() => handleRemoveToast(toast.id)}
                                    className={`shrink-0 ml-2 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${config.text} z-10 relative`}
                                >
                                    <X className="w-4 h-4" />
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                    <div
                                        className={`h-full ${config.progress} ${isExiting ? 'opacity-0 transition-opacity duration-300' : 'animate-toast-progress'}`}
                                        style={{ animationDuration: `${toast.duration}ms` }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes slide-in-right {
                    from { 
                        transform: translateX(100%); 
                        opacity: 0; 
                    }
                    to { 
                        transform: translateX(0); 
                        opacity: 1; 
                    }
                }
                .animate-slide-in-right { 
                    animation: slide-in-right 0.35s cubic-bezier(0.4, 0, 0.2, 1); 
                }

                @keyframes slide-out-right {
                    from { 
                        transform: translateX(0); 
                        opacity: 1; 
                    }
                    to { 
                        transform: translateX(100%); 
                        opacity: 0; 
                    }
                }
                .animate-slide-out-right { 
                    animation: slide-out-right 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
                }

                @keyframes toast-progress {
                    from { 
                        transform: scaleX(1);
                        transform-origin: left;
                    }
                    to { 
                        transform: scaleX(0);
                        transform-origin: left;
                    }
                }
                .animate-toast-progress {
                    animation-name: toast-progress;
                    animation-timing-function: linear;
                    animation-fill-mode: forwards;
                }
            `}</style>
        </>
    );
}