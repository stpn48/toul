"use client";

import { signOut } from "@/app/actions/supabaseAuth";
import { MenuButton } from "@/components/SettingsButton/MenuButton";
import React, { useCallback, useTransition } from "react";
import toast from "react-hot-toast";

export default function SignOutButton() {
  const [isSigningOut, startSigningOut] = useTransition();

  const handleSignOut = useCallback(() => {
    startSigningOut(async () => {
      const { error } = await signOut();
      if (error) {
        toast.error(error);
        return;
      }
    });
  }, []);

  return (
    <MenuButton disabled={isSigningOut} onClick={handleSignOut}>
      <p className="text-red-600">Sign out</p>
    </MenuButton>
  );
}
