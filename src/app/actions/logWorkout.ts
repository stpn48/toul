"use server";

import { LoggedExercises } from "@/store/useLogWorkoutStore";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function logWorkout(workoutId: string, loggedExercises: LoggedExercises) {
  const user = await getUser();

  if (!user) {
    return { error: "You must be logged in to log a workout." };
  }

  if (!workoutId) {
    return { error: "Please provide a workoutId" };
  }

  try {
    // Increment workout timesCompleted
    await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        timesCompleted: {
          increment: 1,
        },
        lastCompleted: new Date(),
      },
    });

    // Iterate over the logged exercises and update each by name
    for (const exerciseName of Object.keys(loggedExercises)) {
      const reps = loggedExercises[exerciseName].flat();

      // Find the exercise by name (ignoring the workout)
      const existingExercise = await prisma.exercise.findFirst({
        where: { name: exerciseName },
      });

      if (existingExercise) {
        // Update the existing exercise's timesCompleted and repHistory
        await prisma.exercise.update({
          where: { id: existingExercise.id },
          data: {
            lastCompletedAt: new Date(),
            timesCompleted: {
              increment: 1,
            },
            repHistory: {
              push: reps,
            },
          },
        });
      } else {
        // Optional: handle if the exercise doesn't exist
        // You could create a new one here if necessary
      }
    }

    revalidatePath("/app/completed-exercises");
  } catch (error) {
    return { error: "Error logging workout" }; // TODO: Add better error handling
  }
}
