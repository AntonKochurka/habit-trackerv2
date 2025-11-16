import { AxiosError } from "axios";
import { ZodError } from "zod";

export interface NormalizedError {
    status: number | null;
    message: string;
    details: any;
}

export function normalizeApiError(error: unknown): NormalizedError {
    if (error instanceof ZodError) {
        return {
            status: 422,
            message: "Validation failed",
            details: error.issues.map(e => ({ field: e.path.join("."), message: e.message }))
        };
    }

    if ((error as AxiosError)?.isAxiosError) {
        const axiosError = error as AxiosError;
        if (!axiosError.response) {
            return { status: null, message: "Network error", details: null };
        }

        const data = axiosError.response.data as any;
        return {
            status: axiosError.response.status,
            message: data?.message || data?.detail || axiosError.message || "Unknown error",
            details: data?.details || data?.errors || null
        };
    }

    if (error instanceof Error) {
        return { status: null, message: error.message, details: null };
    }

    return { status: null, message: "Unknown error", details: JSON.stringify(error) };
}
