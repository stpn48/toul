"use client";

import React from "react";

type Props = { handleCreateExercise: () => void };

export function CreateExerciseButton({ handleCreateExercise }: Props) {
  return (
    <button
      onClick={handleCreateExercise}
      className="absolute bottom-4 right-4 flex w-fit justify-center rounded-full bg-amber-500 px-4 py-2 text-white"
    >
      Create Exercise
    </button>
  );
}
