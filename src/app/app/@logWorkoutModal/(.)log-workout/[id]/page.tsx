import { ExerciseWithSets } from "@/types/types";
import prisma from "@/utils/prisma";
import { redirect } from "next/navigation";
import React from "react";
import { ExerciseSlider } from "./components/ExerciseSlider";

type Props = {
  params: { id: string };
};

export default async function LogWorkoutModal({ params }: Props) {
  if (!params.id) {
    redirect("/app/your-workouts");
  }

  const workout = await prisma.workout.findFirst({
    where: {
      id: params.id,
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  if (!workout) {
    // close modal TODO: Show error toast and improve error handling
    redirect("/app/your-workouts");
  }

  return (
    <div className="fixed inset-0 flex h-screen w-screen flex-col justify-center overflow-hidden bg-stone-400 bg-opacity-50 dark:bg-stone-900 dark:bg-opacity-50">
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
