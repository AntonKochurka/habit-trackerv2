import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, type SignUpValues } from "../types"
import BaseInput from "@/shared/components/forms/base_input";
import SubmitButton from "@/shared/components/forms/submit_button";

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors,  isSubmitting },
    } = useForm<SignUpValues>({
        resolver: zodResolver(SignUpSchema as any) as any
    })
    
    const onSubmit = async (data: SignUpValues) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);
    }
    
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