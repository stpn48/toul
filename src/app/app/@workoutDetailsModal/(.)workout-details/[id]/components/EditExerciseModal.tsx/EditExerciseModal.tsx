"use client";

import { removeExercise } from "@/app/actions/removeExercise";
import { updateExercise } from "@/app/actions/updateExercise";
import { AddSetModal } from "@/app/app/@workoutDetailsModal/(.)workout-details/[id]/components/CreateExerciseModal/AddSetModal";
import CreateExerciseModalHeader from "@/app/app/@workoutDetailsModal/(.)workout-details/[id]/components/CreateExerciseModal/CreateExerciseModalHeader";
import { SetList } from "@/app/app/@workoutDetailsModal/(.)workout-details/[id]/components/CreateExerciseModal/SetList";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useExerciseDetails } from "@/hooks/useExerciseDetails";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { CreateExercise, CreateSet } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { EditSetModal } from "../EditSetModal";
import { EditExerciseButton } from "./EditExerciseButton";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { RemoveExerciseButton } from "./removeExerciseButton";

type Props = {
  exerciseId: string | null;
};

export function EditExerciseModal({ exerciseId }: Props) {
  const { showCreateSetModal, setEditingExerciseId } = useModalVisibility();
  const { updateOptimisticExercise, removeOptimisticExercise } = useOptimisticWorkouts();

  const queryClient = useQueryClient();

  const { data: exercise, isLoading, isFetching, isRefetching, isSuccess } = useExerciseDetails(exerciseId);

  const [exerciseName, setExerciseName] = useState<string | null>(null);
  const [exerciseDescription, setExerciseDescription] = useState<string | null>(null);
  const [exerciseSets, setExerciseSets] = useState<CreateSet[]>([]);

  const [editingSetIndex, setEditingSetIndex] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { madeChanges } = useMadeChanges(
    exercise?.name || "",
    exercise?.description || "",
    exercise?.sets || [],
    exerciseName,
    exerciseDescription,
    exerciseSets,
  );

  const resetForm = useCallback(() => {
    setExerciseName("");
    setExerciseDescription(null);
    setExerciseSets([]);
  }, [setExerciseName, setExerciseDescription, setExerciseSets]);

  const handleEditExercise = useCallback(async () => {
    if (!exercise) {
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

    updateOptimisticExercise(exercise.id, exerciseName, exerciseDescription, exerciseSets);

    // close modal
    setEditingExerciseId(null);

    // add exercise to workout in db
    const { error } = await updateExercise(updatedExercise, exercise.id);

    // if error show error toast
    if (error) {
      toast.error(error);

      // no error
    } else {
      // invalidate query
      queryClient.invalidateQueries({ queryKey: ["exercise", { exerciseId }] });
      resetForm();
    }
  }, [exerciseName, exerciseSets, exerciseDescription, exercise, updateOptimisticExercise, queryClient]);

  const handleRemoveExercise = useCallback(async () => {
    if (!exerciseId) {
      return;
    }

    removeOptimisticExercise(exerciseId);

    setEditingExerciseId(null);

    const { error } = await removeExercise(exerciseId);

    if (error) {
      toast.error(error);
      return;
    }
  }, [exerciseId, removeOptimisticExercise]);

  const handleCloseModal = useCallback(() => {
    if (madeChanges) {
      setShowConfirmationModal(true);
    } else {
      setEditingExerciseId(null);
    }
  }, [madeChanges]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    setExerciseName(exercise?.name || "");
    setExerciseDescription(exercise?.description || "");
    setExerciseSets(exercise?.sets || []);
  }, [isSuccess, exercise]);

  if (isLoading || isFetching || isRefetching) {
    return <LoadingSkeleton />;
  }

  return (
    <Modal className="flex h-[70%] w-[70%] flex-row text-sm" closeModal={handleCloseModal}>
      <section className="w-[30%] rounded-l-lg bg-[#faf8f6] p-6">
        <Input
          disableLabel
          value={exerciseName || ""}
          onChange={(e) => setExerciseName(e.target.value)}
          error={exerciseName === ""}
          errorLabel={"This field is required"}
          placeholder="Exercise Name"
          className="w-full border-0 bg-inherit text-lg font-bold"
        />
        <Input
          disableLabel
          value={exerciseDescription || ""}
          onChange={(e) => setExerciseDescription(e.target.value)}
          placeholder="Exercise Description"
          className="w-full border-0 bg-inherit"
        />
      </section>

      <section className="flex-grow p-4">
        <CreateExerciseModalHeader />
        <SetList exerciseSets={exerciseSets} setEditingSetIndex={setEditingSetIndex} />
        <div className="absolute bottom-4 right-4 flex gap-3">
          <RemoveExerciseButton handleRemoveExercise={handleRemoveExercise} />
          <EditExerciseButton handleEditExercise={handleEditExercise} />
        </div>
      </section>

      {showCreateSetModal && <AddSetModal setExerciseSets={setExerciseSets} />}

      {editingSetIndex !== null && (
        <EditSetModal
          closeModal={() => setEditingSetIndex(null)}
          setExerciseSets={setExerciseSets}
          editingSetIndex={editingSetIndex}
          setDetails={exerciseSets[editingSetIndex]}
        />
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          message="Are you sure you want to discard all changes?"
          closeModal={() => setShowConfirmationModal(false)}
          confirmAction={() => setEditingExerciseId(null)}
        />
      )}
    </Modal>
  );
}

function useMadeChanges(
  initialExerciseName: string,
  initialExerciseDescription: string | null,
  initialExerciseSets: CreateSet[],
  exerciseName: string | null,
  exerciseDescription: string | null,
  exerciseSets: CreateSet[],
) {
  const [madeChanges, setMadeChanges] = useState(false);

  useEffect(() => {
    if (
      initialExerciseName !== exerciseName ||
      initialExerciseDescription !== exerciseDescription ||
      initialExerciseSets.length !== exerciseSets.length
    ) {
      setMadeChanges(true);
    } else {
      setMadeChanges(false);
    }
  }, [initialExerciseName, initialExerciseDescription, initialExerciseSets, exerciseName, exerciseDescription, exerciseSets]);

  return { madeChanges };
}
