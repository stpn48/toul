"use client";

import { LoadingBalls } from "@/components/LoadingBalls";
import { Modal } from "@/components/Modal";
import React from "react";
import { ExercisesSectionHeader } from "./components/ExercisesSectionHeader";

export default function Loading() {
  return (
    <Modal className="flex flex-row" closeModal={() => {}}>
      <section className="flex w-[30%] flex-col gap-6 rounded-l-lg bg-[#faf8f6] p-6">
        <div className="h-[60px] w-full animate-pulse rounded-lg bg-stone-400" />
        <div className="h-[36px] w-full animate-pulse rounded-lg bg-stone-400" />
        <div className="h-[36px] w-full animate-pulse rounded-lg bg-stone-400" />
        <div className="h-[36px] w-full animate-pulse rounded-lg bg-stone-400" />
      </section>
      <section className="relative h-full flex-grow rounded-r-lg p-4">
        <ExercisesSectionHeader loading={true} />

        <LoadingBalls />
      </section>
    </Modal>
  );
}
