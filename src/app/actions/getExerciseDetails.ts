"use server";

import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";

export async function getExerciseDetails(exerciseId: string) {
  const user = await getUser();

  if (!user) {
    throw new Error("You must be logged in to get exercise details");
  }

  if (!exerciseId) {
    throw new Error("Please provide an exerciseId");
  }

  await new Promise((resolve) => setTimeout(resolve, 10));

  try {
    const exercises = await prisma.exercise.findFirst({
      where: {
        id: exerciseId,
      },
      include: {
        sets: true,
      },
    });
    return exercises;
  } catch (error) {
    throw new Error("Error getting exercise details");
  }
}
