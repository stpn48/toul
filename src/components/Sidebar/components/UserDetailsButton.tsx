import Image from "next/image";
import React from "react";

type Props = {
  avatarUrl: string;
  username: string;
};

export function UserDetailsButton({ avatarUrl, username }: Props) {
  return (
    <div className="flex cursor-pointer items-center gap-2">
      <Image src={avatarUrl} height={22} width={22} alt="userPFP" className="rounded-full" /> {/* TODO: Add fallback PFP */}
      <h1 className="max-w-[150px] truncate">{username}</h1>
    </div>
  );
}
