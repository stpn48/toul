"use client";

import Button from "@/components/Button";
import { WorkoutWithExercises } from "@/types/types";
import React, { useEffect, useState } from "react";
import { LogExerciseCard } from "./LogExerciseCard";

type Props = {
  workout: WorkoutWithExercises;
};

export function LogWorkoutModal({ workout }: Props) {
  const [currExerciseIndex, setCurrExerciseIndex] = useState(0);
  const [currLeftPosition, setCurrLeftPosition] = useState(50);

  useEffect(() => {
    if (currExerciseIndex === 0) {
      return;
    }

    setCurrLeftPosition(50 * currExerciseIndex);
  }, [currExerciseIndex]);

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col items-center justify-center bg-stone-400 bg-opacity-50 dark:bg-stone-900 dark:bg-opacity-50">
      <div
        className={`absolute flex transition-transform duration-500
          `}
        style={{ transform: `translateX(-${currExerciseIndex * 100}%)` }}
      >
        {workout.exercises.map((exercise) => (
          <LogExerciseCard exercise={exercise} key={exercise.id} />
        ))}
      </div>
      <div className="z-20 flex w-screen justify-between">
        <Button onClick={() => setCurrExerciseIndex((prev) => prev - 1)}>PREV</Button>
        <Button onClick={() => setCurrExerciseIndex((prev) => prev + 1)}>NEXT</Button>
      </div>
    </div>
  );
}
