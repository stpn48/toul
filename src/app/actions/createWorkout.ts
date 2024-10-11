"use server";

import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createWorkout(
  workoutName: string,
  workoutDescription: string | null,
  workoutDifficulty: string,
  workoutDuration: string,
) {
  const user = await getUser();

  if (!user) {
    return { error: "You must be logged in to create a workout." };
  }

  await prisma.workout.create({
    data: {
      name: workoutName,
      description: workoutDescription,
      difficulty: workoutDifficulty,
      estimatedDuration: workoutDuration,
      userId: user.id,
    },
  });

  revalidatePath("/app");

  return { error: null };
}
