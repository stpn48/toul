"use server";

import prisma from "@/utils/prisma";

export async function getExerciseDetails(exerciseId: string) {
  //TODO: Add security and error handling

  if (!exerciseId) {
    return null;
  }

  return await prisma.exercise.findFirst({
    where: {
      id: exerciseId,
    },
    include: {
      sets: true,
    },
  });
}
