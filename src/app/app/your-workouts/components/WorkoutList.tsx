"use client";

import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import React from "react";

export function WorkoutList() {
  const { optimisticWorkouts } = useOptimisticWorkouts();

  return (
    <div>
      {optimisticWorkouts.map((workout) => (
        <div key={workout.id}>{workout.name}</div>
      ))}
    </div>
  );
}
