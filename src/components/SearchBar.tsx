"use client";

import Input from "@/components/Input";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");

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

  return <Input placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} className="w-full" />;
}
