"use client";

import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { ExerciseWithSets } from "@/types/types";
import React, { useEffect, useState } from "react";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  workoutId: string;
};

export function ExerciseList({ workoutId }: Props) {
  const { optimisticExercises } = useOptimisticWorkouts();

  const [exercises, setExercises] = useState<ExerciseWithSets[]>([]);

  useEffect(() => {
    setExercises(optimisticExercises.filter((exercise) => exercise.workoutId === workoutId));
  }, [optimisticExercises]);

  return (
    <div className="mt-10 flex flex-wrap gap-4">
      {exercises.length === 0 && (
        <p className="flex w-full justify-center text-xs text-secondary">No exercises yet...</p>
      )}
      {exercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
