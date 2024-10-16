import { ExerciseWithSets } from "@/types/types";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import React from "react";
import { ExerciseCard } from "./components/ExerciseCard";

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
    <div>
      <h1 className="flex w-full justify-center text-2xl font-bold">your completed exercises</h1>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {completedExercises.length === 0 && (
          <p className="flex w-full justify-center text-center text-xs text-secondary">No completed exercises yet...</p>
        )}
        {completedExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}
