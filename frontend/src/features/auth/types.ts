import { z, ZodType } from "zod";

export type SignUpValues = {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
}

export const SignUpSchema: ZodType<SignUpValues> = z
    .object({
        username: z.string()
            .min(2, "Username must be at least 2 characters")
            .max(50, "Username must be less than 50 characters"),
        email: z.email("Please enter a valid email address"),
        password: z.string()
            .min(8, "Password must be at least 8 characters")
            .max(255, "Password must be less than 255 characters")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter and one number"),
        confirm_password: z.string()
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    });