import type { ReactNode } from "react";

interface SubmitButtonProps {
  children: ReactNode;
  isSubmitting?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export default function SubmitButton({
  children,
  isSubmitting = false,
  disabled = false,
  type = "submit"
}: SubmitButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isSubmitting}
      className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
    >
      {isSubmitting && (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {isSubmitting ? "Processing..." : children}
    </button>
  );
}