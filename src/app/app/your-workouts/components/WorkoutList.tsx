"use client";

import { useWorkoutListStore } from "@/store/useWorkoutListStore";
import React from "react";
import { WorkoutCard } from "./WorkoutCard";

export function WorkoutList() {
  const { filteredOptimisticWorkouts } = useWorkoutListStore();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap gap-4 transition-all">
        {filteredOptimisticWorkouts.length === 0 && (
          <p className="flex w-full justify-center text-center text-xs text-secondary">No workouts found...</p>
        )}
        {filteredOptimisticWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
