"use client";

import { ExerciseWithSets, Filter } from "@/types/types";
import { filterArray } from "@/utils/filterArray";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  completedExercises: ExerciseWithSets[];
};

export function ExerciseList({ completedExercises }: Props) {
  const searchParams = useSearchParams();

  const [filteredExercises, setFilteredExercises] = useState<ExerciseWithSets[]>([]);

  useEffect(() => {
    const query = searchParams.get("query") || "";
    const filter = searchParams.get("filter") || "";

    const filteredExercises = filterArray(filter as Filter, query, completedExercises);
    setFilteredExercises(filteredExercises as ExerciseWithSets[]);
  }, [searchParams, completedExercises]);

  return (
    <div className="flex flex-wrap gap-4">
      {filteredExercises.length === 0 && (
        <p className="flex w-full justify-center text-center text-xs text-secondary">No completed exercises found...</p>
      )}
      {filteredExercises.map((exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
