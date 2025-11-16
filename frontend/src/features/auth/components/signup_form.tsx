import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignUpValues } from "../types"
import BaseInput from "@/shared/components/forms/base_input";
import SubmitButton from "@/shared/components/forms/submit_button";
import { useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../api";

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors,  isSubmitting },
    } = useForm<SignUpValues>({
        resolver: zodResolver(SignUpSchema as any) as any
    })
    
    const signUpMutation = useSignUpMutation();
    const navigate = useNavigate();

    const onSubmit = async (data: SignUpValues) => {
        
        const {confirm_password, ...payload} = data;
        console.log(data, confirm_password, payload);

        await signUpMutation.mutateAsync(payload, {
            onSuccess: () => {
                navigate("/home", { replace: true });
            }
        });
    };
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <BaseInput 
                field="username" 
                register={register} 
                errors={errors} 
                placeholder="Username"    
            />
            <BaseInput 
                field="email" 
                register={register} 
                errors={errors} 
                placeholder="Email"
                type="email"    
            />
            <BaseInput 
                field="password" 
                register={register} 
                errors={errors} 
                placeholder="Password"
                type="password"    
            />
            <BaseInput 
                field="confirm_password" 
                register={register} 
                errors={errors} 
                placeholder="Confirm your Password"
                type="password"    
            />
            <SubmitButton isSubmitting={isSubmitting}>
                Create Account
            </SubmitButton>
        </form>
    )
}