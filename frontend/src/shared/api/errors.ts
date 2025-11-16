import { AxiosError } from "axios";

export interface NormalizedError {
    status: number | null;
    message: string;
    details: any;
}

export function normalizeApiError(error: AxiosError): NormalizedError {
    if (!error.response) {
        return {
            status: null,
            message: "Network error",
            details: null
        };
    }

    const status = error.response.status;

    const data = error.response.data as any;

    const message =
        data?.message ||
        data?.detail ||
        data?.error ||
        error.message ||
        "Unknown error";

    const details =
        data?.details ||
        data?.errors ||
        null;

    return {
        status,
        message,
        details
    };
}
