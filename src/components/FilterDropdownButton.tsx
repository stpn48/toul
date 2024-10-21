"use client";

import { AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FilterDropdown } from "./FilterDropdown";

export function FilterDropdownButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState(searchParams.get("filter") || "a-z");

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // update url
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("filter", filter);

    router.replace("?" + searchParams.toString());
  }, [filter, router]);

  return (
    <div className="relative z-10">
      <button
        onClick={() => setShowDropdown(true)}
        className="z-10 flex items-center gap-2 rounded-full bg-secondary px-4 py-2 dark:bg-dark-secondary"
      >
        <h1 className="whitespace-nowrap">{filter}</h1>
      </button>

      <AnimatePresence>
        {showDropdown && <FilterDropdown setFilter={setFilter} closeDropdown={() => setShowDropdown(false)} />}
      </AnimatePresence>
    </div>
  );
}
