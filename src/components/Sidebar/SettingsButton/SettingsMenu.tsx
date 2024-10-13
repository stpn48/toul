import SignOutButton from "@/app/app/components/SignOutButton";
import React from "react";

type Props = {
  closeMenu: () => void;
};

export function SettingsMenu({ closeMenu }: Props) {
  //TODO: Improve design and add theme change fucntionality with icons
  return (
    <div onClick={closeMenu} className="fixed inset-0 z-10 h-screen w-screen">
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute right-4 top-8 z-50 flex flex-col gap-2 rounded-lg border border-main p-2"
      >
        <button className="whitespace-nowrap">Change Theme</button>
        <SignOutButton />
      </div>
    </div>
  );
}
