"use client";

import Button from "@/components/Button";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { CreateSet } from "@/types/types";
import React, { SetStateAction } from "react";
import { PlusIcon } from "../ExerciseList";
import { SetCard } from "./SetCard";

type Props = {
  exerciseSets: CreateSet[];
  setEditingSetIndex: React.Dispatch<SetStateAction<number | null>>;
};

export function SetList({ exerciseSets, setEditingSetIndex }: Props) {
  const { setShowCreateSetModal } = useModalVisibility();

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="flex w-full justify-end">
        <Button
          onClick={() => setShowCreateSetModal(true)}
          className="flex items-center justify-center gap-2 rounded-full px-2 py-1 pr-3"
        >
          <PlusIcon />
          <h1>Add Set</h1>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {exerciseSets.length === 0 && <p className="flex w-full justify-center text-xs text-secondary">No sets yet...</p>}
        {exerciseSets.map((set, index) => (
          <SetCard onClick={() => setEditingSetIndex(index)} key={index} set={set} />
        ))}
      </div>
    </div>
  );
}
