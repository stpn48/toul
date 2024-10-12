"use client";

import { Modal } from "@/components/Modal";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { WorkoutWithExercises } from "@/types/types";
import { useRouter } from "next/navigation";
import React from "react";
import { CreateExerciseModal } from "./CreateExerciseModal/CreateExerciseModal";
import { EditExerciseModal } from "./EditExerciseModal.tsx/EditExerciseModal";
import { ExerciseList } from "./ExerciseList";
import { ExercisesSectionHeader } from "./ExercisesSectionHeader";
import { WorkoutDetailsSectionContent } from "./WorkoutDetailsSectionContent";

type Props = {
  workout: WorkoutWithExercises;
};

export function WorkoutDetailsModal({ workout }: Props) {
  const { showCreateExerciseModal, editingExerciseId } = useModalVisibility();
  const router = useRouter();

  return (
    <Modal className="flex flex-row" closeModal={() => router.back()}>
      <section className="flex w-[30%] flex-col gap-8 rounded-l-lg bg-[#faf8f6] p-6">
        <WorkoutDetailsSectionContent workout={workout} />
      </section>
      <section className="flex-grow rounded-r-lg p-4">
        <ExercisesSectionHeader />
        <ExerciseList workoutId={workout.id} />
      </section>

      {showCreateExerciseModal && <CreateExerciseModal workoutId={workout.id} />}
      {editingExerciseId && <EditExerciseModal exerciseId={editingExerciseId} />}
    </Modal>
  );
}
