"use client";

import { addExercise } from "@/app/actions/addExercise";
import { updateExercise } from "@/app/actions/updateExercise";
import Button from "@/components/Button";
import { Modal } from "@/components/Modal";
import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { CreateExercise, CreateSet, ExerciseWithSets, WorkoutWithExercises } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { DeleteWorkoutButton } from "./DeleteWorkoutButton";
import { ExerciseList } from "./ExerciseList";
import { ExerciseModal } from "./ExerciseModal";
import { LogWorkoutModal } from "./LogWorkoutModal/LogWorkoutModal";
import { WorkoutDetailsSectionContent } from "./WorkoutDetailsSectionContent";

export type SubmitProps = {
  exerciseName: string;
  exerciseDescription: string | null;
  exerciseSets: CreateSet[];
  exerciseId: string;
  resetForm: () => void;
  closeModal: () => void;
};

type Props = {
  workout: WorkoutWithExercises;
};

export function WorkoutDetailsModal({ workout }: Props) {
  const {
    setShowCreateExerciseModal,
    showCreateExerciseModal,
    editingExerciseDetails,
    setEditingExerciseDetails,
    showLogWorkoutModal,
    setShowLogWorkoutModal,
  } = useModalVisibility();
  const { updateOptimisticExercise, addExerciseOptimistic } = useOptimisticWorkouts();
  const router = useRouter();

  const handleEditExercise = useCallback(
    async ({ closeModal, resetForm, exerciseName, exerciseDescription, exerciseSets, exerciseId }: SubmitProps) => {
      if (!exerciseId) {
        return;
      }
      // validate fields
      if (!exerciseName || exerciseSets.length === 0) {
        toast.error("Please fill in all fields");
        return;
      }

      const updatedExercise: CreateExercise = {
        name: exerciseName,
        description: exerciseDescription,
        sets: exerciseSets,
      };

      updateOptimisticExercise(exerciseId, exerciseName, exerciseDescription, exerciseSets);

      // close modal
      closeModal();

      // add exerciseId to workout in db
      const { error } = await updateExercise(updatedExercise, exerciseId);

      // if error show error toast
      if (error) {
        toast.error(error);

        // no error
      } else {
        resetForm();
      }
    },
    [updateOptimisticExercise],
  );

  const handleCreateExercise = useCallback(
    async ({ closeModal, resetForm, exerciseName, exerciseDescription, exerciseSets }: SubmitProps) => {
      // validate fields
      if (!exerciseName || exerciseSets.length === 0) {
        toast.error("Please fill in all fields");
        return;
      }

      const optimisticExercise: ExerciseWithSets = {
        id: "1", // id is always 1 for now
        workoutId: "1",
        userId: "1",
        sets: [],
        createdAt: new Date(),
        repHistory: [],
        lastCompletedAt: null,
        timesCompleted: 0,
        description: exerciseDescription,
        name: exerciseName,
      };

      addExerciseOptimistic(optimisticExercise);

      // close modal after adding exercise optimistically
      closeModal();

      // reset state
      resetForm();

      const newExercise: CreateExercise = {
        name: exerciseName,
        description: exerciseDescription,
        sets: exerciseSets,
      };

      // add exercise to workout in db
      const { error } = await addExercise(newExercise, workout.id);

      // if error show error toast
      if (error) {
        toast.error(error);
      }
    },
    [workout.id, addExerciseOptimistic],
  );

  return (
    <Modal className="flex flex-row" closeModal={() => router.back()}>
      <section className="flex w-[30%] flex-col gap-8 rounded-l-lg bg-secondary p-2 dark:bg-dark-secondary dark:text-dark-main">
        <WorkoutDetailsSectionContent workout={workout} />
        <DeleteWorkoutButton workoutId={workout.id} />
      </section>
      <section className="relative h-full flex-grow rounded-r-lg p-4 dark:bg-dark">
        <h1 className="text-xs font-bold text-secondary">EXERCISES</h1>
        <ExerciseList workoutId={workout.id} />
        <Button onClick={() => setShowLogWorkoutModal(true)} className="absolute bottom-4 right-4">
          Log Workout
        </Button>
      </section>

      {showCreateExerciseModal && (
        <ExerciseModal
          submitButtonText="Create Exercise"
          onSubmit={handleCreateExercise}
          closeModal={() => setShowCreateExerciseModal(false)}
        />
      )}

      {editingExerciseDetails && (
        <ExerciseModal
          submitButtonText="Edit Exercise"
          onSubmit={handleEditExercise}
          closeModal={() => setEditingExerciseDetails(null)}
          removeButton
        />
      )}

      {showLogWorkoutModal && <LogWorkoutModal workout={workout} />}
    </Modal>
  );
}
