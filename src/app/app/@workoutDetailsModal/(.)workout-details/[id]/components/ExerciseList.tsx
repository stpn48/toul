"use client";

import Button from "@/components/Button";
import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { ExerciseWithSets } from "@/types/types";
import React, { useEffect, useState } from "react";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  workoutId: string;
};

export function ExerciseList({ workoutId }: Props) {
  const { setShowCreateExerciseModal } = useModalVisibility();
  const { optimisticExercises } = useOptimisticWorkouts();

  const [exercises, setExercises] = useState<ExerciseWithSets[]>([]);

  useEffect(() => {
    setExercises(optimisticExercises.filter((exercise) => exercise.workoutId === workoutId || exercise.workoutId === "1"));
  }, [optimisticExercises, workoutId]);

  return (
    <div className="mt-4 h-[90%] gap-4 overflow-y-auto text-main dark:text-dark-main">
      <div className="flex w-full justify-end">
        <Button onClick={() => setShowCreateExerciseModal(true)} className="flex items-center gap-2 rounded-full px-2 py-1 pr-3">
          <PlusIcon />
          Add Exercise
        </Button>
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {exercises.length === 0 && <p className="flex w-full justify-center text-xs text-secondary">No exercises yet...</p>}
        {exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}

export function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
