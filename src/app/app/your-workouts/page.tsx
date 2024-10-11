import React from "react";
import { WorkoutList } from "./components/WorkoutList";

export default async function YourWorkoutsPage() {
  return (
    <div className="flex-grow p-4 text-black dark:text-white">
      <h1 className="text-2xl font-bold">Your Workouts</h1>
      <p className="mt-10 flex w-full justify-center">No workouts yet...</p>
      <WorkoutList />
    </div>
  );
}
