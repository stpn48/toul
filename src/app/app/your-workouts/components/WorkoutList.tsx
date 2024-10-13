"use client";

import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import React from "react";
import { WorkoutCard } from "./WorkoutCard";

export function WorkoutList() {
  const { optimisticWorkouts } = useOptimisticWorkouts();

  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {optimisticWorkouts.length === 0 && (
        <p className="flex w-full justify-center text-center text-xs text-secondary">No workouts yet...</p>
      )}
      {optimisticWorkouts.map((workout) => (
        <WorkoutCard key={workout.id} workout={workout} />
      ))}
    </div>
  );
}
