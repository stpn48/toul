"use server";

import { CreateExercise } from "@/types/types";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addExercise(exercise: CreateExercise, workoutId: string) {
  const user = await getUser();

  if (!user) {
    return { error: "You must be logged in to create a workout." };
  }

  if (!exercise.name || exercise.sets.length === 0) {
    return { error: "Please fill in all fields" };
  }

  try {
    await prisma.exercise.create({
      data: {
        workoutId,
        name: exercise.name,
        description: exercise.description,
        sets: {
          create: exercise.sets.map((set) => ({
            name: set.name,
            isWarmupSet: set.isWarmupSet,
            targetReps: set.targetReps,
          })),
        },
        userId: user.id,
      },
    });
  } catch (error) {
    return { error: "Error creating exercise" }; //TODO: Add better error handling
  }

  revalidatePath("/app");

  return { error: null };
}
