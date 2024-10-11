import React from "react";
import CreateWorkoutButton from "./components/CreateWorkoutButton";
import { SidebarLinks } from "./components/Links";
import { SidebarContainer } from "./components/SidebarContainer";
import { ToggleSidebarButton } from "./components/ToggleSidebarButton";
import { UserDetails } from "./components/UserDetails";

type Props = {};

export function Sidebar({}: Props) {
  return (
    <SidebarContainer className="fixed flex h-screen w-[250px] flex-col gap-10 bg-[#faf8f6] p-4 dark:bg-black">
      <UserDetails />
      <ToggleSidebarButton />
      <CreateWorkoutButton />
      <SidebarLinks />
      <div className="absolute bottom-4 text-xs text-[#aaaaaa] dark:text-[#aaaaaa]">
        {/* TODO: Add text color for dark mode */}
        <h1>Toul® 2024 All Rights Reserved</h1>
      </div>
    </SidebarContainer>
  );
}
