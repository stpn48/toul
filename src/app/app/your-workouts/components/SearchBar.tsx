"use client";

import Input from "@/components/Input";
import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useWorkoutListStore } from "@/store/useWorkoutListStore";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export function SearchBar({}: Props) {
  const { setFilteredOptimisticWorkouts } = useWorkoutListStore();
  const { optimisticWorkouts } = useOptimisticWorkouts();

  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState<string>(searchParams.get("query") || "");

  useEffect(() => {
    // filter workouts
    setFilteredOptimisticWorkouts(() =>
      optimisticWorkouts.filter((workout) => workout.name.toLowerCase().includes(query.toLowerCase())),
    );

    // update url
    const searchParams = new URLSearchParams(window.location.search);

    if (!query) {
      searchParams.delete("query");
      router.replace("?" + searchParams.toString());
      return;
    }

    searchParams.set("query", query);
    router.replace("?" + searchParams.toString());
  }, [query, setFilteredOptimisticWorkouts, router, optimisticWorkouts]);

  return <Input placeholder="Query" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full" />;
}
