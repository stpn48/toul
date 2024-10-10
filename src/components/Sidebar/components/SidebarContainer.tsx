"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { useSidebarVisibility } from "../use-sidebar-visibility";

type Props = {
  children: React.ReactNode;

  className?: string;
};

export function SidebarContainer({ children, className }: Props) {
  const { showSidebar } = useSidebarVisibility();

  return (
    <div
      className={twMerge(
        "transition-all duration-[300ms]",
        className,
        showSidebar ? "left-0" : "-left-[250px]",
      )}
    >
      {children}
    </div>
  );
}
