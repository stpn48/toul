"use client";

import { getExerciseDetails } from "@/app/actions/getExerciseDetails";
import { useQuery } from "@tanstack/react-query";

export function useExerciseDetails(exerciseId: string | null) {
  return useQuery({
    queryKey: ["exercise", { exerciseId }],
    queryFn: () => getExerciseDetails(exerciseId || ""),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
  });
}
