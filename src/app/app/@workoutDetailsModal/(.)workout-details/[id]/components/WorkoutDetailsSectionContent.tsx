import { Workout } from "@prisma/client";
import React from "react";

type Props = {
  workout: Workout;
};

export function WorkoutDetailsSectionContent({ workout }: Props) {
  return (
    <>
      <div>
        <h1 className="break-words text-xl font-bold">{workout.name}</h1>
        <p className="break-words text-sm text-secondary">{workout.description}</p>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xs font-bold text-secondary">DIFFICULTY</h1>
        <p>{workout.difficulty}</p>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xs font-bold text-secondary">ESTIMATED DURATION</h1>
        <p>{workout.estimatedDuration}</p>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xs font-bold text-secondary">CREATED</h1>
        <p>{workout.createdAt.toLocaleDateString()}</p>
      </div>
    </>
  );
}
