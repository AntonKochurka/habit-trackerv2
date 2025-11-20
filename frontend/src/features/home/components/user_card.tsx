import { useAuthStore } from "@/core/store";

export default function UserCard() {
    const user = useAuthStore((s) => s.user);

    if (!user) return null;

    return (
        <div className="w-full p-6 bg-linear-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-6">
            
            <div className="w-16 h-16 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl">
                <span className="text-xl font-bold text-white">
                    {user.username[0].toUpperCase()}
                </span>
            </div>

            <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                    Welcome back,
                </h2>
                <p className="text-lg font-medium text-indigo-500">
                    {user.username}
                </p>
            </div>
        </div>
    );
}
