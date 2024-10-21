"use client";

import { useModalVisibility } from "@/store/useModalVisiblity";
import React, { useCallback } from "react";
import { useSidebarVisibility } from "../use-sidebar-visibility";

export default function CreateWorkoutButton() {
  const { setShowCreateWorkoutModal } = useModalVisibility();

  const { setShowSidebar, isSmallDisplay } = useSidebarVisibility();

  const handleClick = useCallback(() => {
    if (isSmallDisplay) {
      setShowSidebar(false);
    }

    setShowCreateWorkoutModal(true);
  }, [isSmallDisplay, setShowSidebar, setShowCreateWorkoutModal]);

  return (
    <button
      onClick={handleClick}
      className="flex w-full items-center gap-2 rounded-lg p-2 text-main hover:bg-hover dark:text-dark-main dark:hover:bg-dark-hover"
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
