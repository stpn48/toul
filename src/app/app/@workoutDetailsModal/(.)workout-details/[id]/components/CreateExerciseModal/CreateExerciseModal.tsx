"use client";

import { addExercise } from "@/app/actions/addExercise";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { CreateExercise, CreateSet, ExerciseWithSets } from "@/types/types";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import CreateExerciseModalHeader from "./CreateExerciseModalHeader";
import { AddSetModal } from "./AddSetModal";
import { CreateExerciseButton } from "./CreateExerciseButton";
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

  const handleCreateExercise = useCallback(async () => {
    // validate fields
    if (!exerciseName || exerciseSets.length === 0) {
      toast.error("Please fill in all fields");
      return;
    }

    // add exercise optimistically
    const optimisticExercise: ExerciseWithSets = {
      workoutId,
      userId: "1",
      sets: exerciseSets,
      id: uuidv4(),
      createdAt: new Date(),
      repHistory: [],
      timesCompleted: 0,
      description: exerciseDescription,
      name: exerciseName,
    };

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

  return (
    <Modal
      className="flex h-[70%] w-[70%] flex-row text-sm"
      closeModal={() => setShowCreateExerciseModal(false)}
    >
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
        <SetList exerciseSets={exerciseSets} />
        <CreateExerciseButton handleCreateExercise={handleCreateExercise} />
      </section>

      {showCreateSetModal && <AddSetModal setExerciseSets={setExerciseSets} />}
    </Modal>
  );
}
