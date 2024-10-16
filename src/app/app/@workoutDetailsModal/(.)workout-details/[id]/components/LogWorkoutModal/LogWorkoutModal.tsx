import { ExerciseWithSets, WorkoutWithExercises } from "@/types/types";
import React from "react";
import { ExerciseSlider } from "./components/ExerciseSlider";
import { ExitButton } from "./components/ExitButton";

type Props = {
  workout: WorkoutWithExercises;
};

export async function LogWorkoutModal({ workout }: Props) {
  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col justify-center overflow-hidden bg-stone-600 bg-opacity-50 backdrop-blur-sm dark:bg-stone-900 dark:bg-opacity-50">
      <ExitButton className="absolute right-4 top-4" />
      <ExerciseSlider exercises={filterWarmupSets(workout.exercises)} />
    </div>
  );
}

function filterWarmupSets(exercises: ExerciseWithSets[]) {
  return exercises
    .map((exercise: ExerciseWithSets) => ({
      ...exercise,
      sets: exercise.sets.filter((set) => !set.isWarmupSet), // Filter out warmup sets
    }))
    .filter((exercise: ExerciseWithSets) => exercise.sets.length > 0);
}
