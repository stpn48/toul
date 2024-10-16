"use client";

import { useModalVisibility } from "@/store/useModalVisiblity";
import { ExerciseWithSets } from "@/types/types";
import React from "react";

type Props = {
  exercise: ExerciseWithSets;
};

export function ExerciseCard({ exercise }: Props) {
  const { setEditingExerciseDetails } = useModalVisibility();

  return (
    <div
      onClick={() => {
        if (exercise.id !== "1") {
          setEditingExerciseDetails(exercise);
        } // if exercise is not optimistic, open modal (id 1 says its optimistic  )
      }}
      className="flex w-full cursor-pointer rounded-md border border-main p-5 text-main hover:border-hover dark:border-dark-main dark:text-dark-main dark:hover:border-dark-hover"
    >
      <div className="flex w-[40%] flex-col">
        <h1 className="text-base">{exercise.name}</h1>
        <p className="text-secondary">{exercise.description}</p>
      </div>
      <div className="grid flex-grow grid-cols-2 gap-2">
        <h1 className="text-xs font-bold text-secondary">SET NAME</h1>
        <h1 className="text-xs font-bold text-secondary">TARGET REPS</h1>

        {exercise.sets.map((set) => (
          <>
            <h1>{set.name}</h1>
            <p>{set.targetReps}</p>
          </>
        ))}
      </div>
    </div>
  );
}
