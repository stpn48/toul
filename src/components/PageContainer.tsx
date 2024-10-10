"use client";

import React from "react";
import { useSidebarVisibility } from "./Sidebar/use-sidebar-visibility";

type Props = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: Props) {
  const { showSidebar } = useSidebarVisibility();

  return (
    <div className={`p-10 transition-all duration-[300ms] ${showSidebar ? "pl-[290px]" : ""}`}>
      {children}
    </div>
  );
}
