"use client";

import { addExercise } from "@/app/actions/addExercise";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { CreateExercise, CreateSet, ExerciseWithSets } from "@/types/types";
import { createOptimisticExercise } from "@/utils/createOptimisticExercise";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { EditSetModal } from "../EditSetModal";
import { AddSetModal } from "./AddSetModal";
import { CreateExerciseButton } from "./CreateExerciseButton";
import CreateExerciseModalHeader from "./CreateExerciseModalHeader";
import { SetList } from "./SetList";

type Props = {
  workoutId: string;
};

export function CreateExerciseModal({ workoutId }: Props) {
  const { setShowCreateExerciseModal, showCreateSetModal } = useModalVisibility();
  const { addExerciseOptimistic } = useOptimisticWorkouts();

  const [exerciseName, setExerciseName] = useState<string | null>(null);
  const [exerciseDescription, setExerciseDescription] = useState<string | null>(null);
  const [exerciseSets, setExerciseSets] = useState<CreateSet[]>([]);

  const [editingSetIndex, setEditingSetIndex] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { madeChanges } = useMadeChanges(exerciseName, exerciseDescription, exerciseSets);

  const handleCreateExercise = useCallback(async () => {
    // validate fields
    if (!exerciseName || exerciseSets.length === 0) {
      toast.error("Please fill in all fields");
      return;
    }

    const optimisticExercise = createOptimisticExercise(
      {
        id: "1", // id is always 1 for now
        workoutId,
        userId: "1",
        sets: [],
        createdAt: new Date(),
        repHistory: [],
        timesCompleted: 0,
        description: null,
        name: "ss",
      },
      exerciseName,
      exerciseDescription,
      exerciseSets,
    );

    addExerciseOptimistic(optimisticExercise);

    // close modal after adding exercise optimistically
    setShowCreateExerciseModal(false);

    // reset state
    setExerciseName(null);
    setExerciseDescription(null);
    setExerciseSets([]);

    const newExercise: CreateExercise = {
      name: exerciseName,
      description: exerciseDescription,
      sets: exerciseSets,
    };

    // add exercise to workout in db
    const { error } = await addExercise(newExercise, workoutId);

    // if error show error toast
    if (error) {
      toast.error(error);
    }
  }, [exerciseName, exerciseSets, exerciseDescription]);

  const handleCloseModal = useCallback(() => {
    if (madeChanges) {
      setShowConfirmationModal(true);
    } else {
      setShowCreateExerciseModal(false);
    }
  }, [madeChanges]);

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
        <CreateExerciseButton onClick={handleCreateExercise} />
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
          closeModal={() => setShowConfirmationModal(false)}
          message="Are you sure you want to discard all changes?"
          confirmAction={() => setShowCreateExerciseModal(false)}
        />
      )}
    </Modal>
  );
}

function useMadeChanges(exerciseName: string | null, exerciseDescription: string | null, exerciseSets: CreateSet[]) {
  const [madeChanges, setMadeChanges] = useState(false);

  useEffect(() => {
    if (exerciseName || exerciseDescription || exerciseSets.length > 0) {
      setMadeChanges(true);
    } else {
      setMadeChanges(false);
    }
  }, [exerciseName, exerciseDescription, exerciseSets]);

  return { madeChanges };
}
