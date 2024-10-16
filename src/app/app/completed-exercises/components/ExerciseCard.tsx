import { ExerciseWithSets } from "@/types/types";
import Link from "next/link";
import React from "react";

type Props = {
  exercise: ExerciseWithSets;
};

export function ExerciseCard({ exercise }: Props) {
  return (
    <Link href={`/app/exercise-details/${exercise.id}`}>
      <div className="cursor-pointer rounded-lg border border-main p-4 text-sm hover:border-hover dark:border-dark-main dark:hover:border-dark-hover">
        <h1>{exercise.name}</h1>
        <p className="text-xs text-secondary">{exercise.description}</p>
        <p className="text-xs text-secondary">Last Completed: {exercise.lastCompletedAt?.toLocaleDateString()}</p>
        <p className="text-xs text-secondary">Times Completed: {exercise.timesCompleted}</p>
      </div>
    </Link>
  );
}
