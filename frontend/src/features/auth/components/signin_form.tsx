import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, type SignInValues, type AuthMode } from "../types";
import BaseInput from "@/shared/components/forms/base_input";
import SubmitButton from "@/shared/components/forms/submit_button";
import { Mail, User } from "lucide-react";
import Tooltip from "@/shared/components/tooltip";

export default function SignInForm() {
    const [authMode, setAuthMode] = useState<AuthMode>("username");
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<SignInValues>({
        resolver: zodResolver(SignInSchema(authMode)) as any,
        defaultValues: {
            mode: "username"
        }
    });
    
    const toggleAuthMode = () => {
        const newMode: AuthMode = authMode === "email" ? "username" : "email";
        setAuthMode(newMode);
        setValue("mode", newMode);
    };
    
    const onSubmit = async (data: SignInValues) => {
        console.log(data.mode)
        const mode: AuthMode = authMode;
        console.log("data", {[mode]: data.credential, password: data.password});
        await new Promise(resolve => setTimeout(resolve, 2000));
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <input 
                type="hidden" 
                {...register("mode")} 
                value={authMode}
            />
            
            <div className="relative">
                <BaseInput<SignInValues>
                    field="credential"
                    register={register}
                    errors={errors}
                    placeholder={authMode === "email" ? "Email address" : "Username"}
                    type={authMode === "email" ? "email" : "text"}
                />
                
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Tooltip
                        content={`Switch to ${authMode === "email" ? "username" : "email"}`}
                        position="left"
                    >
                        <button
                            type="button"
                            onClick={toggleAuthMode}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-300 dark:border-gray-600"
                        >
                            {authMode === "email" ? (
                                <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            )}
                        </button>
                    </Tooltip>
                </div>
            </div>
            
            <BaseInput<SignInValues>
                field="password"
                register={register}
                errors={errors}
                placeholder="Password"
                type="password"
            />
            
            <BaseInput<SignInValues>
                field="confirm_password"
                register={register}
                errors={errors}
                placeholder="Confirm Password"
                type="password"
            />
            
            <SubmitButton isSubmitting={isSubmitting}>
                Sign In
            </SubmitButton>
        </form>
    );
}