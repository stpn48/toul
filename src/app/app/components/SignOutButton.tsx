"use client";

import { signOut } from "@/app/actions/supabaseAuth";
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
    <button disabled={isSigningOut} onClick={handleSignOut}>
      Sign out
    </button>
  );
}
