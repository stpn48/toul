"use client";

import { removeExercise } from "@/app/actions/removeExercise";
import Button from "@/components/Button";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { CreateSet } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AddSetModal } from "../AddSetModal";
import { EditSetModal } from "../EditSetModal";
import { RemoveExerciseButton } from "../RemoveExerciseButton";
import { SetList } from "../SetList";
import { SubmitProps } from "../WorkoutDetailsModal";

type Props = {
  onSubmit: (arg0: SubmitProps) => Promise<void>;
  submitButtonText: string;
  closeModal: () => void;
  removeButton?: boolean;
};

export function ExerciseModal({ onSubmit, submitButtonText, closeModal, removeButton }: Props) {
  const { showCreateSetModal, setEditingExerciseDetails, editingExerciseDetails: exerciseDetails } = useModalVisibility();
  const { removeOptimisticExercise } = useOptimisticWorkouts();

  const [exerciseName, setExerciseName] = useState<string>(exerciseDetails?.name || "");
  const [exerciseDescription, setExerciseDescription] = useState<string>(exerciseDetails?.description || "");
  const [exerciseSets, setExerciseSets] = useState<CreateSet[]>(exerciseDetails?.sets || []);

  const [editingSetIndex, setEditingSetIndex] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const { madeChanges } = useMadeChanges(
    exerciseDetails?.name || "",
    exerciseDetails?.description || "",
    exerciseDetails?.sets || [],
    exerciseName,
    exerciseDescription,
    exerciseSets,
  );

  const resetForm = useCallback(() => {
    setExerciseName("");
    setExerciseDescription("");
    setExerciseSets([]);
  }, [setExerciseName, setExerciseDescription, setExerciseSets]);

  const handleRemoveExercise = useCallback(async () => {
    if (!exerciseDetails?.id) {
      return;
    }

    removeOptimisticExercise(exerciseDetails.id);

    setEditingExerciseDetails(null);

    const { error } = await removeExercise(exerciseDetails.id);

    if (error) {
      toast.error(error);
      return;
    }
  }, [exerciseDetails?.id, removeOptimisticExercise, closeModal, resetForm, setEditingExerciseDetails]);

  const handleCloseModal = useCallback(() => {
    if (madeChanges) {
      setShowConfirmationModal(true);
    } else {
      closeModal();
    }
  }, [madeChanges]);

  return (
    <Modal className="flex h-[70%] w-[70%] flex-row text-sm" closeModal={handleCloseModal}>
      <section className="w-[30%] rounded-l-lg bg-secondary p-6 text-main dark:bg-dark-secondary dark:text-dark-main">
        <Input
          disableLabel
          value={exerciseName || ""}
          onChange={(e) => setExerciseName(e.target.value)}
          error={exerciseName === ""}
          errorLabel={"This field is required"}
          placeholder="Exercise Name"
          className="w-full border-0 bg-inherit text-lg font-bold dark:text-dark-main"
        />
        <Input
          disableLabel
          value={exerciseDescription || ""}
          onChange={(e) => setExerciseDescription(e.target.value)}
          placeholder="Exercise Description"
          className="w-full border-0 bg-inherit dark:text-dark-main"
        />
      </section>

      <section className="flex-grow p-4">
        <h1 className="text-xs font-bold text-secondary">SETS</h1>
        <SetList exerciseSets={exerciseSets} setEditingSetIndex={setEditingSetIndex} />
        <div className="absolute bottom-4 right-4 flex gap-3">
          {removeButton && <RemoveExerciseButton handleRemoveExercise={handleRemoveExercise} />}
          <Button
            onClick={() =>
              onSubmit({
                closeModal,
                resetForm,
                exerciseName,
                exerciseDescription,
                exerciseSets,
                exerciseId: exerciseDetails?.id || "",
              })
            }
          >
            {submitButtonText}
          </Button>
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
          confirmAction={() => setEditingExerciseDetails(null)}
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
