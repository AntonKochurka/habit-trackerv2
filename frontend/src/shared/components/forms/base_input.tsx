import type { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";

interface BaseInputProps<T extends FieldValues> {
    field: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    placeholder: string;
    type?: string;
}

export default function BaseInput<T extends FieldValues>({
    field, 
    register, 
    errors,
    placeholder,
    type = "text"
}: BaseInputProps<T>) {
    
    return (
        <div>
            <input
                type={type}
                {...register(field)}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {errors[field] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[field]?.message as string}
                </p>
            )}
        </div>
    );
}