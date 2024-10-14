"use client";

import { motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useSidebarVisibility } from "../use-sidebar-visibility";

export function ToggleSidebarButton() {
  const { showSidebar, setShowSidebar } = useSidebarVisibility();

  return (
    <motion.button
      onClick={() => setShowSidebar((prev) => !prev)}
      className={twMerge(
        "ease dark:text-dark absolute right-4 top-4 text-black transition-all duration-[300ms] dark:hover:text-white",
        !showSidebar && "dark:text-dark-secondary -right-10",
      )}
    >
      <svg
        className="text-black dark:text-secondary"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M19 4.001H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-12a2 2 0 0 0-2-2Zm-15 2a1 1 0 0 1 1-1h4v14H5a1 1 0 0 1-1-1v-12Zm6 13h9a1 1 0 0 0 1-1v-12a1 1 0 0 0-1-1h-9v14Z"
          clipRule="evenodd"
        ></path>
      </svg>
    </motion.button>
  );
}
