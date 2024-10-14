import { Workout } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  workout: Workout;
};

export function WorkoutCard({ workout }: Props) {
  // TODO: Add ability to open workout details with Enter
  return (
    <Link href={`/app/workout-details/${workout.id}`}>
      <div
        tabIndex={0}
        role="button"
        className="main-border flex w-[275px] cursor-pointer justify-between gap-2 rounded-lg border p-4 outline-none hover:border-amber-500 dark:border-main dark:hover:border-hover"
      >
        <div className="flex flex-col">
          <h1 className="max-w-[150px] truncate">{workout.name}</h1>
          <p className="max-w-[150px] truncate text-secondary">{workout.description}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-red-600">{workout.difficulty}</p>
          <p>{workout.estimatedDuration}</p>
        </div>
      </div>
    </Link>
  );
}
