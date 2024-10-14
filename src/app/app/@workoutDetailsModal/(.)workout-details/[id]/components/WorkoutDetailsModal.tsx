"use client";

import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { WorkoutWithExercises } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { CreateExerciseModal } from "./CreateExerciseModal/CreateExerciseModal";
import { DeleteWorkoutButton } from "./DeleteWorkoutButton";
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
      <section className="flex w-[30%] flex-col gap-8 rounded-l-lg bg-[#faf8f6] p-2 dark:bg-black dark:text-white">
        <WorkoutDetailsSectionContent workout={workout} />
        <DeleteWorkoutButton workoutId={workout.id} />
      </section>
      <section className="relative h-full flex-grow rounded-r-lg p-4 dark:bg-dark">
        <ExercisesSectionHeader />
        <ExerciseList workoutId={workout.id} />
        <Link href={`/app/log-workout/${workout.id}`}>
          <Button className="absolute bottom-4 right-4">Log Workout</Button>
        </Link>
      </section>

      {showCreateExerciseModal && <CreateExerciseModal workoutId={workout.id} />}
      {editingExerciseId && <EditExerciseModal exerciseId={editingExerciseId} />}
    </Modal>
  );
}
