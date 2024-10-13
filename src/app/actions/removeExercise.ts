"use server";

import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function removeExercise(exerciseId: string) {
  const user = await getUser();

  if (!user) {
    return { error: "You must be logged in to remove an exercise." };
  }

  if (!exerciseId) {
    return { error: "Please provide an exerciseId" };
  }

  try {
    await prisma.exercise.delete({
      where: {
        id: exerciseId,
      },
    });
  } catch (error) {
    return { error: "Error removing exercise" };
  }

  revalidatePath("/app");

  return { error: null };
}
