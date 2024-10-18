"use client";

import Input from "@/components/Input";
import { useWorkoutListStore } from "@/store/useWorkoutListStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

export function SearchBar({}: Props) {
  const { query, setQuery } = useWorkoutListStore();

  const router = useRouter();

  useEffect(() => {
    // update url
    const searchParams = new URLSearchParams(window.location.search);

    if (!query) {
      searchParams.delete("query");
      router.replace("?" + searchParams.toString());
      return;
    }

    searchParams.set("query", query);
    router.replace("?" + searchParams.toString());
  }, [query, router]);

  return <Input placeholder="Query" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full" />;
}
