import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import React from "react";

export default async function CompletedExercisesPage() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const completedExercises = await prisma.exercise.findMany({
    where: {
      userId: user.id,
      timesCompleted: {
        gt: 0,
      },
    },
    include: {
      workout: true,
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Your Completed Exercises</h1>
      <div>
        {completedExercises.map((exercise) => (
          <div key={exercise.id}>
            <h2>{exercise.name}</h2>
            <p>{exercise.description}</p>
            <p>{exercise.timesCompleted} times completed</p>
            <p>Workout: {exercise.workout.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
