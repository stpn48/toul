import { FilterDropdownButton } from "@/components/FilterDropdownButton";
import { SearchBar } from "@/components/SearchBar";
import React from "react";

export function Filters() {
  return (
    <div className="z-0 flex w-full items-center justify-center gap-2 md:justify-start">
      <SearchBar />
      <FilterDropdownButton />
    </div>
  );
}
