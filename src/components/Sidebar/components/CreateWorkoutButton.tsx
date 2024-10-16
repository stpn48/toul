"use client";

import { useModalVisibility } from "@/store/useModalVisiblity";
import React from "react";

export default function CreateWorkoutButton() {
  const { setShowCreateWorkoutModal } = useModalVisibility();

  return (
    <button
      onClick={() => setShowCreateWorkoutModal(true)}
      className="text-main dark:text-dark-main hover:bg-hover dark:hover:bg-dark-hover flex w-full items-center gap-2 rounded-lg p-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path
          fillRule="evenodd"
          d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </svg>
      Create new Workout
    </button>
  );
}
