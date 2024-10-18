import React from "react";
import { FilterDropdownButton } from "./components/FilterDropdownButton";
import { Filters } from "./components/Filters";
import { SearchBar } from "./components/SearchBar";
import { WorkoutList } from "./components/WorkoutList";

export default async function YourWorkoutsPage() {
  return (
    <div className="flex h-full w-full flex-grow flex-col gap-8 text-main dark:text-dark-main">
      <h1 className="flex w-full justify-center text-2xl font-bold">your workouts</h1>
      <Filters />
      <WorkoutList />
    </div>
  );
}
