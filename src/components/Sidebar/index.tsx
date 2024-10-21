import React from "react";
import CreateWorkoutButton from "./components/CreateWorkoutButton";
import { SidebarLinks } from "./components/Links";
import { SidebarContainer } from "./components/SidebarContainer";
import { ToggleSidebarButton } from "./components/ToggleSidebarButton";
import { UserDetails } from "./components/UserDetails";

export function Sidebar() {
  return (
    <SidebarContainer className="fixed z-30 flex h-screen w-[275px] flex-col gap-10 bg-secondary px-5 pb-4 pt-7 dark:bg-black">
      <div className="flex w-full items-center justify-between">
        <UserDetails />
        <ToggleSidebarButton />
      </div>
      <CreateWorkoutButton />
      <SidebarLinks />
      <div className="flex h-full w-full items-end justify-center text-xs text-[#cacaca] dark:text-dark-secondary">
        {/* TODO: Add text color for dark mode */}
        <h1>Toul® 2024 All Rights Reserved</h1>
      </div>
    </SidebarContainer>
  );
}
