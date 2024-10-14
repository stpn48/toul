"use client";

import { CreateSet } from "@/types/types";
import React from "react";

type Props = {
  set: CreateSet;
  onClick: () => void;
};

export function SetCard({ set, onClick }: Props) {
  return (
    <>
      <div
        onClick={onClick}
        className="flex cursor-pointer justify-between rounded-lg bg-white px-4 py-2 text-xs font-bold text-secondary hover:bg-amber-500 hover:bg-opacity-20 dark:bg-inherit dark:bg-opacity-30 dark:hover:bg-stone-800"
      >
        <h1>{set.name}</h1>
        <p>{set.targetReps} reps</p>
      </div>
      <div className="flex h-px w-full bg-[#b8b8b8] dark:bg-[#5c5c5c]"></div>
    </>
  );
}
