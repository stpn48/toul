import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  children: React.ReactNode;
};

export default function Button({ className, variant, children, ...props }: Props) {
  return (
    <button
      className={twMerge(
        "rounded-lg bg-amber-500 px-4 py-2 text-sm text-white dark:bg-white dark:text-black",
        className,
        variant === "secondary" && "bg-stone-400",
      )}
      {...props}
    >
      {children}
    </button>
  );
}
