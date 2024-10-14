"use client";

import { CreateSet } from "@/types/types";
import React from "react";

type Props = {
  set: CreateSet;
  onClick: () => void;
};

export function SetCard({ set, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="hover:bg-hover dark:border-dark-main dark:hover:border-dark-hover dark:hover:bg-dark-hover flex cursor-pointer justify-between rounded-lg border border-main p-2 px-4 py-2 text-sm font-bold text-secondary"
    >
      <h1>{set.name}</h1>
      <p>{set.targetReps} reps</p>
    </div>
  );
}
