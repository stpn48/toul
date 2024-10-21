"use client";

import { LoadingBalls } from "@/components/LoadingBalls";
import { Modal } from "@/components/Modal";
import React from "react";

export default function Loading() {
  return (
    <Modal className="flex flex-col lg:flex-row" closeModal={() => {}}>
      <section className="flex w-full flex-col gap-6 rounded-l-lg bg-secondary p-6 dark:bg-dark-secondary lg:w-[30%]">
        <div className="h-[60px] w-full animate-pulse rounded-lg bg-stone-300 dark:bg-stone-900" />
        <div className="h-[36px] w-full animate-pulse rounded-lg bg-stone-300 dark:bg-stone-900" />
        <div className="h-[36px] w-full animate-pulse rounded-lg bg-stone-300 dark:bg-stone-900" />
        <div className="h-[36px] w-full animate-pulse rounded-lg bg-stone-300 dark:bg-stone-900" />
      </section>
      <section className="relative h-full flex-grow rounded-r-lg p-4">
        <LoadingBalls />
      </section>
    </Modal>
  );
}
