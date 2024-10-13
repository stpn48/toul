"use server";

import prisma from "@/utils/prisma";
import { getUser } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function removeWorkout(workoutId: string) {
  const user = await getUser();

  if (!user) {
    return { error: "You must be logged in to remove a workout." };
  }

  if (!workoutId) {
    return { error: "Please provide a workoutId" };
  }

  const workout = await prisma.workout.findFirst({
    where: {
      id: workoutId,
    },
  });

  if (!workout) {
    return { error: "Workout not found" };
  }

  if (workout.userId !== user.id) {
    return { error: "You are not the owner of this workout" };
  }

  try {
    await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    });
  } catch (error) {
    return { error: "Error removing workout" };
  }

  revalidatePath("/app");
  redirect("/app/your-workouts");
}
