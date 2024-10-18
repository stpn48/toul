"use client";

import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useWorkoutListStore } from "@/store/useWorkoutListStore";
import { Filter } from "@/types/types";
import { Workout } from "@prisma/client";
import React, { useEffect } from "react";
import { FilterDropdownButton } from "./FilterDropdownButton";
import { SearchBar } from "./SearchBar";

export function Filters() {
  const { query, filter, setFilteredOptimisticWorkouts } = useWorkoutListStore();
  const { optimisticWorkouts } = useOptimisticWorkouts();

  useEffect(() => {
    const filteredWorkouts = filterWorkouts(filter, query, optimisticWorkouts);
    setFilteredOptimisticWorkouts(filteredWorkouts);
  }, [query, filter, optimisticWorkouts]);

  return (
    <div className="flex items-center gap-2">
      <SearchBar />
      <FilterDropdownButton />
    </div>
  );
}

const filterWorkouts = (filter: Filter, query: string, workouts: Workout[]) => {
  const filteredWorkoutsByQuery = workouts.filter((workout) => workout.name.toLowerCase().includes(query));

  switch (filter) {
    case "a-z":
      return filteredWorkoutsByQuery.sort((a, b) => a.name.localeCompare(b.name));

    case "z-a":
      return filteredWorkoutsByQuery.sort((a, b) => b.name.localeCompare(a.name));

    case "times completed lowest to highest":
      return filteredWorkoutsByQuery.sort((a, b) => a.timesCompleted - b.timesCompleted);

    case "times completed highest to lowest":
      return filteredWorkoutsByQuery.sort((a, b) => b.timesCompleted - a.timesCompleted);

    case "last completed latest to oldest":
      return filteredWorkoutsByQuery.sort((a, b) => {
        const timeA = a.lastCompletedAt ? a.lastCompletedAt.getTime() : Infinity;
        const timeB = b.lastCompletedAt ? b.lastCompletedAt.getTime() : Infinity;

        return timeA - timeB;
      });

    case "last completed oldest to latest":
      return filteredWorkoutsByQuery.sort((a, b) => {
        const timeA = a.lastCompletedAt ? a.lastCompletedAt.getTime() : Infinity;
        const timeB = b.lastCompletedAt ? b.lastCompletedAt.getTime() : Infinity;

        return timeB - timeA;
      });

    case "created latest to oldest":
      return filteredWorkoutsByQuery.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    case "created oldest to latest":
      return filteredWorkoutsByQuery.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    default:
      return workouts;
  }
};
