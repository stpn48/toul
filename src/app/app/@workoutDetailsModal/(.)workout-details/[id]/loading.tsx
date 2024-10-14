"use client";

import { LoadingBalls } from "@/components/LoadingBalls";
import { Modal } from "@/components/Modal";
import React from "react";
import { ExercisesSectionHeader } from "./components/ExercisesSectionHeader";

export default function Loading() {
  return (
    <Modal className="flex flex-row" closeModal={() => {}}>
      <section className="bg-secondary dark:bg-dark-secondary flex w-[30%] flex-col gap-6 rounded-l-lg p-6">
        <div className="h-[60px] w-full animate-pulse rounded-lg bg-stone-300 dark:bg-stone-900" />
        <div className="h-[36px] w-full animate-pulse rounded-lg bg-stone-300 dark:bg-stone-900" />
        <div className="h-[36px] w-full animate-pulse rounded-lg bg-stone-300 dark:bg-stone-900" />
        <div className="h-[36px] w-full animate-pulse rounded-lg bg-stone-300 dark:bg-stone-900" />
      </section>
      <section className="relative h-full flex-grow rounded-r-lg p-4">
        <ExercisesSectionHeader loading={true} />

        <LoadingBalls />
      </section>
    </Modal>
  );
}
