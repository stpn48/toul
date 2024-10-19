"use client";

import SignOutButton from "@/app/app/components/SignOutButton";
import React from "react";
import { ThemeToggleButton } from "./ThemeToggleButton";

type Props = {
  closeMenu: () => void;
};

export function SettingsMenu({ closeMenu }: Props) {
  return (
    <>
      <div onClick={closeMenu} className="fixed inset-0 z-10 h-screen w-screen"></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="z-50 flex flex-col gap-2 rounded-lg border border-main bg-secondary p-2 shadow-lg dark:border-dark-main dark:bg-dark-secondary dark:text-dark-main"
      >
        <ThemeToggleButton />
        <div className="h-px w-full bg-hover dark:bg-dark-hover" />
        <SignOutButton />
      </div>
    </>
  );
}
