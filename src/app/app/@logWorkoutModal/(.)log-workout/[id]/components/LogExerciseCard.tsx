import { ExerciseWithSets } from "@/types/types";
import React from "react";

type Props = { exercise: ExerciseWithSets };

export function LogExerciseCard({ exercise }: Props) {
  return <div>{exercise.name}</div>;
}
