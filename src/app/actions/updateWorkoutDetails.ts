"use server";

import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateWorkoutDetails(
  workoutName: string,
  workoutDescription: string | null,
  workoutEstimatedDuration: string,
  workoutId: string,
) {
  const user = await getUser();

  if (!user) {
    return { error: "You must be logged in to update a workout." };
  }

  if (!workoutName || workoutName.length === 0) {
    return { error: "Please fill in all fields" };
  }

  try {
    await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        name: workoutName,
        description: workoutDescription,
        estimatedDuration: workoutEstimatedDuration,
      },
    });
  } catch (error) {
    return { error: "Error updating workout" }; //TODO: Add better error handling
  }

  revalidatePath("/app");

  return { error: null };
}
