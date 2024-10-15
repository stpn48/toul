"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useCallback } from "react";
import { MenuButton } from "./MenuButton";

const MOON_ICON_URL = "/MoonIcon.svg";
const SUN_ICON_URL = "/SunIcon.svg";

type Props = {};

export function ThemeToggleButton({}: Props) {
  const { resolvedTheme, setTheme } = useTheme();

  const handleChangeTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [setTheme, resolvedTheme]);

  return (
    <MenuButton className="flex items-center gap-2 whitespace-nowrap" onClick={handleChangeTheme}>
      <p>Change Theme</p>
      <Image src={resolvedTheme === "dark" ? SUN_ICON_URL : MOON_ICON_URL} alt="theme icon" width={20} height={20} />
    </MenuButton>
  );
}
