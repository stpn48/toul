"use client";

import React from "react";

type Props = { handleEditExercise: () => void };

export function EditExerciseButton({ handleEditExercise }: Props) {
  return (
    <button
      onClick={() => handleEditExercise()}
      className="flex w-fit justify-center rounded-full bg-amber-500 px-4 py-2 text-white"
    >
      Edit Exercise
    </button>
  );
}
