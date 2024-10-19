"use server";

import { CreateExercise } from "@/types/types";
import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateExercise(newExercise: CreateExercise, exerciseId: string) {
  const user = await getUser();

  if (!user) {
    return { error: "You must be logged in to update an exercise." };
  }

  if (!newExercise.name || newExercise.sets.length === 0) {
    return { error: "Please fill in all fields" };
  }

  if (!exerciseId) {
    return { error: "Please provide an exerciseId" };
  }

  try {
    await prisma.exercise.update({
      where: {
        id: exerciseId,
      },
      data: {
        name: newExercise.name,
        description: newExercise.description,
        sets: {
          deleteMany: {},
          create: newExercise.sets.map((set) => ({
            isWarmupSet: set.isWarmupSet,
            name: set.name,
            targetReps: set.targetReps,
          })),
        },
      },
    });
  } catch {
    return { error: "Error updating exercise" }; //TODO: Add better error handling
  }

  revalidatePath("/app");

  return { error: null };
}
