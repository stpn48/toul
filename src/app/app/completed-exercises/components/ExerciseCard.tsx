"use client";

import { ExerciseWithSets } from "@/types/types";
import React, { useState } from "react";
import { ExerciseDetailsModal } from "./ExerciseDetailsModal";

type Props = {
  exercise: ExerciseWithSets;
};

export function ExerciseCard({ exercise }: Props) {
  const [showExerciseDetailsModal, setShowExerciseDetailsModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowExerciseDetailsModal(true)}
        className="cursor-pointer rounded-lg border border-main p-4 text-sm hover:border-hover dark:border-dark-main dark:hover:border-dark-hover"
      >
        <h1>{exercise.name}</h1>
        <p className="mb-4 text-xs text-secondary">{exercise.description}</p>
        <p className="text-xs text-secondary">Times Completed: {exercise.timesCompleted}</p>
        <p className="text-xs text-secondary">Last Completed: {exercise.lastCompletedAt?.toLocaleDateString()}</p>
      </div>

      {showExerciseDetailsModal && (
        <ExerciseDetailsModal exercise={exercise} closeModal={() => setShowExerciseDetailsModal(false)} />
      )}
    </>
  );
}
