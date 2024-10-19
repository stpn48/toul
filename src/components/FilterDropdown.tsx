"use client";

import { Filter } from "@/types/types";
import { motion } from "framer-motion";
import React, { useCallback } from "react";

const filters = [
  "a-z",
  "z-a",
  "times completed lowest to highest",
  "times completed highest to lowest",
  "last completed latest to oldest",
  "last completed oldest to latest",
  "created latest to oldest",
  "created oldest to latest",
];

type Props = {
  setFilter: (filter: Filter) => void;
  closeDropdown: () => void;
};

export function FilterDropdown({ setFilter, closeDropdown }: Props) {
  const handleChoiceClick = useCallback(
    (filter: Filter) => {
      setFilter(filter);
      closeDropdown();
    },
    [setFilter, closeDropdown],
  );

  return (
    <>
      {/* Invisible backdrop */}
      <div className="fixed inset-0 z-10 h-screen w-screen" onClick={closeDropdown} />

      {/* Dropdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute top-10 z-20 flex flex-col gap-2 rounded-lg border border-main bg-secondary p-4 text-sm dark:border-dark-main dark:bg-dark-secondary"
      >
        {filters.map((filter) => (
          <div key={filter}>
            <button
              onClick={() => handleChoiceClick(filter as Filter)}
              className="w-full whitespace-nowrap rounded-lg p-2 hover:bg-hover dark:hover:bg-dark-hover"
            >
              {filter}
            </button>
            <div className="h-px w-full bg-hover last:h-0 dark:bg-dark-hover"></div>
          </div>
        ))}
      </motion.div>
    </>
  );
}
