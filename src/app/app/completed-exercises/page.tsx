import { Filters } from "@/components/Filters";
import { ExerciseWithSets } from "@/types/types";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import React from "react";
import { ExerciseList } from "./components/ExerciseList";

export default async function CompletedExercisesPage() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const completedExercises: ExerciseWithSets[] = await prisma.exercise.findMany({
    where: {
      userId: user.id,
      timesCompleted: {
        gt: 0,
      },
    },
    include: {
      sets: true,
    },
  });

  return (
    <div className="flex h-full w-full flex-grow flex-col gap-8 text-main dark:text-dark-main">
      <h1 className="flex w-full justify-center text-2xl font-bold">your completed exercises</h1>
      <Filters />
      <ExerciseList completedExercises={completedExercises} />
    </div>
  );
}
