"use client";

import { Modal } from "@/components/Modal";
import { ExerciseWithSets } from "@/types/types";
import React from "react";
import { ChartInformation } from "./ChartInformation";
import { RepsChart } from "./RepsChart";

type Props = {
  exercise: ExerciseWithSets;
  closeModal: () => void;
};

export function ExerciseDetailsModal({ exercise, closeModal }: Props) {
  return (
    <Modal className="flex flex-col gap-8 overflow-auto p-4 pr-6" closeModal={closeModal}>
      <div>
        <h1 className="text-xl font-bold">{exercise.name}</h1>
        <p className="text-secondary dark:text-dark-secondary">{exercise.description}</p>
      </div>

      <div>
        <div className="mb-4 flex w-full justify-between">
          <h1>your progress</h1>

          <ChartInformation />
        </div>
        <RepsChart reps={exercise.repHistory} />
      </div>
      <div className="flex w-full flex-col items-center gap-4 text-sm text-secondary">
        <h2>last completed: {exercise.lastCompletedAt?.toLocaleDateString()}</h2>
        <h2>times completed: {exercise.timesCompleted}</h2>
      </div>
    </Modal>
  );
}
