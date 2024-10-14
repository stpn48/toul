"use client";

import { useModalVisibility } from "@/store/useModalVisiblity";
import React from "react";

type Props = {
  loading?: boolean;
};

export default function CreateExerciseModalHeader({ loading }: Props) {
  const { setShowCreateSetModal } = useModalVisibility();

  return (
    <div className="flex w-full items-center justify-between pr-5">
      <h1 className="text-xs font-bold text-secondary">SETS</h1>
      <button
        disabled={loading}
        onClick={() => setShowCreateSetModal(true)}
        className="flex items-center justify-center gap-2 rounded-full bg-amber-500 px-2 py-1 pr-3 text-white dark:bg-white dark:text-black"
      >
        <PlusIcon />
        <h1>Add Set</h1>
      </button>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
