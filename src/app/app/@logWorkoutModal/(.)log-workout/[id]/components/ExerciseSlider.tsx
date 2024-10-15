"use client";

import { useLogWorkoutStore } from "@/store/useLogWorkoutStore";
import { ExerciseWithSets } from "@/types/types";
import React from "react";
import { LogExerciseCard } from "./LogExerciseCard";
import { SliderButtons } from "./SliderButtons";

type Props = {
  exercises: ExerciseWithSets[];
};

export function ExerciseSlider({ exercises }: Props) {
  const { currExerciseIndex } = useLogWorkoutStore();

  return (
    <>
      <div
        className={`flex w-fit items-center transition-transform duration-500`}
        style={{ transform: `translateX(-${currExerciseIndex * 100}vw)` }}
      >
        {exercises.map((exercise) => (
          <div className="flex h-fit w-[100vw] justify-center" key={exercise.id}>
            <LogExerciseCard exercise={exercise} />
          </div>
        ))}
      </div>
      <SliderButtons exercises={exercises} />
    </>
  );
}
