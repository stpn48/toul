import { FilterDropdownButton } from "@/components/FilterDropdownButton";
import { SearchBar } from "@/components/SearchBar";
import React from "react";

export function Filters() {
  return (
    <div className="flex items-center gap-2">
      <SearchBar />
      <FilterDropdownButton />
    </div>
  );
}
