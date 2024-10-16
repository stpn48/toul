"use client";

import { useModalVisibility } from "@/store/useModalVisiblity";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  className?: string;
};

export function ExitButton({ className }: Props) {
  const { setShowLogWorkoutModal } = useModalVisibility();

  return (
    <button className={className} onClick={() => setShowLogWorkoutModal(false)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8 text-black dark:text-white"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
