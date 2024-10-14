import React from "react";
import { WorkoutList } from "./components/WorkoutList";

export default async function YourWorkoutsPage() {
  return (
    <div className="text-main dark:text-dark-main flex h-full w-full flex-grow flex-col gap-8">
      <h1 className="text-2xl font-bold">Your Workouts</h1>
      <WorkoutList />
    </div>
  );
}
