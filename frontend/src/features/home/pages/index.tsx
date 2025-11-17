import { useToastStore } from "@/core/store"
import { api, normalizeApiError } from "@/shared/api"

export default function HomeIndexPage() {
    const addToast = useToastStore((state) => state.addToast)

    return (
        <div className="flex items-center justify-center h-screen">
            <button
                onClick={async () => {
                    try {
                        await api.get("/auth/healt")
                        addToast("Server is healthy ✅", "success")
                    } catch (error) {
                        addToast(normalizeApiError(error).message, "error")
                    }
                }}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 active:scale-95 transition-transform duration-150"
            >
                Check Health
            </button>
        </div>
    )
}
