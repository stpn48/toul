"use client";

import React from "react";

type Props = { onClick: () => void };

export function CreateExerciseButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-4 right-4 flex w-fit justify-center rounded-full bg-amber-500 px-4 py-2 text-white"
    >
      Create Exercise
    </button>
  );
}
