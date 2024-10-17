"use client";

import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useWorkoutListStore } from "@/store/useWorkoutListStore";
import { Filter } from "@/types/types";
import { Workout } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FilterDropdown } from "./FilterDropdown";

type Props = {};

export function FilterDropdownButton({}: Props) {
  const { setFilteredOptimisticWorkouts } = useWorkoutListStore();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [showDropdown, setShowDropdown] = useState(false);

  const [filter, setFilter] = useState<string>(searchParams.get("filter") || "a-z");

  useEffect(() => {
    setFilteredOptimisticWorkouts((prev) => sortWorkouts((filter as Filter) || "a-z", prev));

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("filter", filter);

    router.replace("?" + searchParams.toString());
  }, [filter, setFilteredOptimisticWorkouts, router]);

  return (
    <div className="relative">
      <button onClick={() => setShowDropdown(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-4 dark:text-dark-secondary"
        >
          <path
            fillRule="evenodd"
            d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <AnimatePresence>
        {showDropdown && <FilterDropdown setFilter={setFilter} closeDropdown={() => setShowDropdown(false)} />}
      </AnimatePresence>
    </div>
  );
}

const sortWorkouts = (filter: Filter, workouts: Workout[]) => {
  switch (filter) {
    case "a-z":
      return workouts.sort((a, b) => a.name.localeCompare(b.name));

    case "z-a":
      return workouts.sort((a, b) => b.name.localeCompare(a.name));

    case "times completed lowest to highest":
      return workouts.sort((a, b) => a.timesCompleted - b.timesCompleted);

    case "times completed highest to lowest":
      return workouts.sort((a, b) => b.timesCompleted - a.timesCompleted);

    case "last completed latest to oldest":
      return workouts.sort((a, b) => {
        const timeA = a.lastCompletedAt ? a.lastCompletedAt.getTime() : Infinity;
        const timeB = b.lastCompletedAt ? b.lastCompletedAt.getTime() : Infinity;

        return timeA - timeB;
      });

    case "last completed oldest to latest":
      return workouts.sort((a, b) => {
        const timeA = a.lastCompletedAt ? a.lastCompletedAt.getTime() : Infinity;
        const timeB = b.lastCompletedAt ? b.lastCompletedAt.getTime() : Infinity;

        return timeB - timeA;
      });

    case "created latest to oldest":
      return workouts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

    case "created oldest to latest":
      return workouts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    default:
      return workouts;
  }
};
