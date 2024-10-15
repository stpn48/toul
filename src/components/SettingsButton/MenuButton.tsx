import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

export function MenuButton({ children, className, ...props }: Props) {
  return (
    <button className={twMerge("rounded-md p-2 hover:bg-hover dark:hover:bg-dark-hover", className)} {...props}>
      {children}
    </button>
  );
}
