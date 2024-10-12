import { CreateSet } from "@/types/types";
import React from "react";

type Props = {
  set: CreateSet;
};

export function SetCard({ set }: Props) {
  return (
    <>
      <div className="flex justify-between bg-white px-4 text-xs font-bold text-secondary">
        <h1>{set.name}</h1>
        <p>{set.targetReps} reps</p>
      </div>
      <div className="flex h-px w-full bg-[#b8b8b8]"></div>
    </>
  );
}
