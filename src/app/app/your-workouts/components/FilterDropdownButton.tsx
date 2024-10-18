"use client";

import { useWorkoutListStore } from "@/store/useWorkoutListStore";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FilterDropdown } from "./FilterDropdown";

type Props = {};

export function FilterDropdownButton({}: Props) {
  const { filter, setFilter } = useWorkoutListStore();

  const router = useRouter();

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // update url
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("filter", filter);

    router.replace("?" + searchParams.toString());
  }, [filter, router]);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(true)}
        className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 dark:bg-dark-secondary"
      >
        <h1>{filter}</h1>
      </button>

      <AnimatePresence>
        {showDropdown && <FilterDropdown setFilter={setFilter} closeDropdown={() => setShowDropdown(false)} />}
      </AnimatePresence>
    </div>
  );
}
