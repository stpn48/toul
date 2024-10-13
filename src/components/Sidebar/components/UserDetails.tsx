import { getUser } from "@/utils/supabase/server";
import React from "react";
import { UserDetailsButton } from "./UserDetailsButton";

export async function UserDetails() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <UserDetailsButton avatarUrl={user.user_metadata.avatar_url} username={user.email || "No name"} />
    </div>
  );
}
