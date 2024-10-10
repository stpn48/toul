import Link from "next/link";
import React from "react";
import CreateWorkoutButton from "./components/CreateWorkoutButton";
import { SidebarContainer } from "./components/SidebarContainer";
import { ToggleSidebarButton } from "./components/ToggleSidebarButton";
import { UserDetails } from "./components/UserDetails";

type Props = {};

const links = [
  {
    title: "Your Workouts",
    href: "/your-workouts",
  },
  {
    title: "Completed Exercises",
    href: "/completed-exercises",
  },
  {
    title: "Completed Workouts",
    href: "/completed-workouts",
  },
];

export function Sidebar({}: Props) {
  return (
    <SidebarContainer className="fixed flex h-screen w-[250px] flex-col gap-10 bg-[#faf8f6] p-4 dark:bg-black">
      <UserDetails />
      <ToggleSidebarButton />
      <CreateWorkoutButton />
      <div className="flex w-full flex-col items-start gap-4">
        {links.map((link) => (
          <Link
            className="dark:text-secondary-text-dark text-black hover:text-[#454545] dark:hover:text-white"
            key={link.title}
            href={link.href}
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 text-[#aaaaaa] dark:text-[#aaaaaa]">
        {/* TODO: Add text color for dark mode */}
        <h1>Toul® 2024 All Rights Reserved</h1>
      </div>
    </SidebarContainer>
  );
}
