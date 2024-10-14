"use client";

import SignOutButton from "@/app/app/components/SignOutButton";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useCallback } from "react";

type Props = {
  closeMenu: () => void;
};

const MOON_ICON_URL = "/MoonIcon.svg";
const SUN_ICON_URL = "/SunIcon.svg";

export function SettingsMenu({ closeMenu }: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  const handleChangeTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [setTheme, resolvedTheme]);

  //TODO: Improve design and add theme change fucntionality with icons
  return (
    <div onClick={closeMenu} className="fixed inset-0 z-10 h-screen w-screen">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-4 top-8 z-50 flex flex-col gap-2 rounded-lg bg-[#faf8f6] p-2 shadow-lg dark:border dark:border-main dark:bg-dark dark:text-white"
      >
        <button className="flex items-center gap-2 whitespace-nowrap" onClick={handleChangeTheme}>
          <p>Change Theme</p>
          <Image src={resolvedTheme === "dark" ? MOON_ICON_URL : SUN_ICON_URL} alt="theme icon" width={20} height={20} />
        </button>
        <SignOutButton />
      </div>
    </div>
  );
}
