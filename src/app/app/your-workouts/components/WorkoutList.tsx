"use client";

import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { Filter } from "@/types/types";
import { filterArray } from "@/utils/filterArray";
import { Workout } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { WorkoutCard } from "./WorkoutCard";

export function WorkoutList() {
  const { optimisticWorkouts } = useOptimisticWorkouts();

  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>(optimisticWorkouts);

  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const filter = searchParams.get("filter") || "";

    const filteredWorkouts = filterArray(filter as Filter, query, optimisticWorkouts);
    setFilteredWorkouts(filteredWorkouts as Workout[]);
  }, [optimisticWorkouts, searchParams]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap justify-center gap-4 md:justify-start">
        {filteredWorkouts.length === 0 && (
          <p className="flex w-full justify-center text-center text-xs text-secondary">No workouts found...</p>
        )}
        {filteredWorkouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
}
