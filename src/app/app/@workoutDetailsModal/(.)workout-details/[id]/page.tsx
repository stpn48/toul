import prisma from "@/utils/prisma";
import React from "react";
import { WorkoutDetailsModal } from "./components/WorkoutDetailsModal";

type Props = {
  params: {
    id: string;
  };
};

export default async function WorkoutDetailsPage({ params }: Props) {
  if (!params.id) {
    return null; //TODO: Improve error handling
  }

  const workout = await prisma.workout.findFirst({
    where: {
      id: params.id,
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  if (!workout) {
    return null; //TODO: Improve error handling
  }

  return <WorkoutDetailsModal workout={workout} />;
}
