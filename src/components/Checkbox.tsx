"use client";

import React, { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  onClick?: () => void;
  initialIsChecked?: boolean;
};

export function Checkbox({ onClick, initialIsChecked = false }: Props) {
  const [isChecked, setIsChecked] = useState(initialIsChecked);

  const handleOnClick = useCallback(() => {
    if (onClick) {
      onClick();
    }

    setIsChecked((prev) => !prev);
  }, [setIsChecked, onClick]);

  return (
    <div
      onClick={handleOnClick}
      className={twMerge(
        "flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border border-main dark:border-dark-main dark:bg-black",
        isChecked && "bg-blue-600 dark:bg-blue-600",
        isChecked && "border-blue-600 dark:border-blue-600",
      )}
    >
      {isChecked && <CheckmarkIcon />}
    </div>
  );
}

function CheckmarkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-3 text-white dark:text-white"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}
