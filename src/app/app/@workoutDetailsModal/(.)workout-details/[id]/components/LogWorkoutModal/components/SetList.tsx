"use client";

import Input from "@/components/Input";
import { useLogWorkoutStore } from "@/store/useLogWorkoutStore";
import { ExerciseWithSets } from "@/types/types";
import React, { useCallback, useEffect } from "react";

type Props = { exercise: ExerciseWithSets };

export function SetList({ exercise }: Props) {
  const { setLoggedExercises, loggedExercises, setCanGoNext, currExerciseIndex } = useLogWorkoutStore();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const value = parseInt(e.target.value) || -1;

      setLoggedExercises((prev) => {
        const newLoggedExercises = { ...prev };

        const updatedReps = [...(newLoggedExercises[exercise.name] || [])];
        updatedReps[index] = value;
        newLoggedExercises[exercise.name] = updatedReps;

        return newLoggedExercises;
      });
    },
    [setLoggedExercises, exercise.name],
  );

  useEffect(() => {
    const loggedReps = loggedExercises[exercise.name] || [];
    const isComplete = !loggedReps.includes(-1) && loggedReps.length === exercise.sets.length;

    setCanGoNext(isComplete);
  }, [loggedExercises, exercise.name, exercise.id, exercise.sets.length, setCanGoNext, currExerciseIndex]);

  return (
    <div className="mt-4 flex flex-col gap-2">
      <h1 className="text-xs font-bold text-secondary">SETS</h1>
      {exercise.sets.map((set, index) => (
        <div key={set.id} className="flex items-center justify-between">
          <h1>{set.name}</h1>
          <Input
            value={loggedExercises[exercise.name]?.[index] !== -1 ? loggedExercises[exercise.name]?.[index] : ""}
            onChange={(e) => handleInputChange(e, index)}
            min={0}
            placeholder="Your Reps"
            className="w-[120px]"
            type="number"
          />
        </div>
      ))}
    </div>
  );
}
