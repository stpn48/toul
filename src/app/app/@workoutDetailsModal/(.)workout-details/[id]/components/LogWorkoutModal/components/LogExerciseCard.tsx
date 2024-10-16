import { ExerciseWithSets } from "@/types/types";
import React from "react";
import { SetList } from "./SetList";

type Props = { exercise: ExerciseWithSets };

export function LogExerciseCard({ exercise }: Props) {
  return (
    <div className="w-[300px] rounded-lg border border-main bg-white p-6 dark:border-dark-main dark:bg-dark dark:bg-dark-secondary">
      <h1 className="text-base">{exercise.name}</h1>
      <p className="text-secondary">{exercise.description}</p>
      <SetList exercise={exercise} />
    </div>
  );
}
