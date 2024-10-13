"use client";

import { CreateSet } from "@/types/types";
import React, { SetStateAction } from "react";
import { SetCard } from "./SetCard";

type Props = {
  exerciseSets: CreateSet[];
  setEditingSetIndex: React.Dispatch<SetStateAction<number | null>>;
};

export function SetList({ exerciseSets, setEditingSetIndex }: Props) {
  return (
    <div className="mt-10 flex flex-col gap-4">
      {exerciseSets.length === 0 && <p className="flex w-full justify-center text-xs text-secondary">No sets yet...</p>}
      {exerciseSets.map((set, index) => (
        <SetCard onClick={() => setEditingSetIndex(index)} key={index} set={set} />
      ))}
    </div>
  );
}
