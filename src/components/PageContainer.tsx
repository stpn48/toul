"use client";

import React, { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useSidebarVisibility } from "./Sidebar/use-sidebar-visibility";

type Props = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: Props) {
  const { showSidebar, setShowSidebar, isSmallDisplay, setIsSmallDisplay } = useSidebarVisibility();

  // Handle moving content to the left a little based  and screen size
  useEffect(() => {
    // run once initially
    if (window.innerWidth <= 720) {
      setIsSmallDisplay(true);
    } else {
      setIsSmallDisplay(false);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 720) {
        setIsSmallDisplay(true);
      } else {
        setIsSmallDisplay(false);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <>
      <div
        className={twMerge(
          `mx-auto h-full w-full max-w-[80%] p-10 transition-all duration-[300ms]`,
          showSidebar && twMerge("", !isSmallDisplay && "pl-[315px]"),
        )}
      >
        {children}
      </div>

      {showSidebar && isSmallDisplay && (
        <div onClick={() => setShowSidebar(false)} className="fixed inset-0 z-10 bg-black bg-opacity-50 dark:bg-opacity-50" />
      )}
    </>
  );
}
