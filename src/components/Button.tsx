import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
  disabled?: boolean;
};

export default function Button({ className, variant, children, disabled, ...props }: Props) {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "rounded-lg bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black",
        className,
        variant === "secondary" && "bg-stone-400",
        disabled && "cursor-not-allowed opacity-50",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
