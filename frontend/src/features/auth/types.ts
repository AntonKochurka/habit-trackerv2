import { env } from "@/core/config/env";
import { z, ZodType } from "zod";

export interface SignUpRequest {
    username: string;
    email: string;
    password: string;
}

export interface SignUpValues extends SignUpRequest {
    confirm_password: string;
}

export const SignUpSchema: ZodType<SignUpValues> = z
    .object({
        username:
            z.string()
                .min(2, "Username must be at least 2 characters")
                .max(50, "Username must be less than 50 characters")
                .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain latin letters, numbers and underscore"),
        email: env.DEV
            ? z.string().min(1, "Email required")
            : z.email("Please enter a valid email address"),
        password: env.DEV
            ? z.string().min(1, "Password required")
            : z.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase latin letter and one number"),
        confirm_password: z.string()
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    });

export interface SignInRequest {
    username: string | null;
    email: string | null;
    password: string;
}

export type AuthMode = "email" | "username";

export type SignInValues = {
    credential: string;
    password: string;
    confirm_password: string;
    mode: AuthMode;
}

export const SignInSchema = (mode: AuthMode) => z
    .object({
        credential: 
            mode === "email"
                ? z.email("Please enter a valid email address")
                : z.string()
                    .min(2, "Username must be at least 2 characters")
                    .max(50, "Username must be less than 50 characters")
                    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain latin letters, numbers and underscore"),
        password: env.DEV
            ? z.string().min(1, "Password required")
            : z.string()
                .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase latin letter and one number"),
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    });
