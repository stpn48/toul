"use client";

import { getExerciseDetails } from "@/app/actions/getExerciseDetails";
import { updateExercise } from "@/app/actions/updateExercise";
import { AddSetModal } from "@/app/app/@workoutDetailsModal/(.)workout-details/[id]/components/CreateExerciseModal/AddSetModal";
import CreateExerciseModalHeader from "@/app/app/@workoutDetailsModal/(.)workout-details/[id]/components/CreateExerciseModal/CreateExerciseModalHeader";
import { SetList } from "@/app/app/@workoutDetailsModal/(.)workout-details/[id]/components/CreateExerciseModal/SetList";
import Input from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { CreateExercise, CreateSet, ExerciseWithSets } from "@/types/types";
import prisma from "@/utils/prisma";
import { useQuery } from "@tanstack/react-query";
import { setServers } from "dns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { EditExerciseButton } from "./EditExerciseButton";

type Props = {
  exerciseId: string | null;
};

export function EditExerciseModal({ exerciseId }: Props) {
  const { showCreateSetModal, setEditingExerciseId } = useModalVisibility();
  const { updateOptimisticExercise } = useOptimisticWorkouts();
  // TODO: move ths query into separate hook
  const {
    data: exercise,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["exercise", { exerciseId }],
    queryFn: () => getExerciseDetails(exerciseId || ""),
  });

  const router = useRouter();

  const [exerciseName, setExerciseName] = useState<string | null>(null);
  const [exerciseDescription, setExerciseDescription] = useState<string | null>(null);
  const [exerciseSets, setExerciseSets] = useState<CreateSet[]>([]);

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

    const optimisticExercise: ExerciseWithSets = {
      workoutId: exercise.workoutId,
      userId: exercise.userId,
      sets: exerciseSets.map((set) => ({
        name: set.name,
        targetReps: set.targetReps,
        exerciseId: exercise.id,
        id: uuidv4(),
        createdAt: new Date(),
      })),
      id: exercise.id,
      createdAt: exercise.createdAt,
      repHistory: exercise.repHistory,
      timesCompleted: exercise.timesCompleted,
      description: exerciseDescription,
      name: exerciseName,
    };

    updateOptimisticExercise(optimisticExercise, exercise.id);

    setEditingExerciseId(null);

    // add exercise to workout in db
    const { error } = await updateExercise(updatedExercise, exercise.id);

    // if error show error toast
    if (error) {
      toast.error(error);

      // no error, reset state
    } else {
      setExerciseName("");
      setExerciseDescription(null);
      setExerciseSets([]);
    }
  }, [exerciseName, exerciseSets, exerciseDescription, exercise, updateOptimisticExercise]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    setExerciseName(exercise?.name || "");
    setExerciseDescription(exercise?.description || "");
    setExerciseSets(exercise?.sets || []);
  }, [isSuccess, exercise]);

  if (isLoading) {
    return <div>loading...</div>; //TODO: Add skeleton
  }

  return (
    <Modal
      className="flex h-[70%] w-[70%] flex-row text-sm"
      closeModal={() => setEditingExerciseId(null)}
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
        <EditExerciseButton handleEditExercise={handleEditExercise} />
      </section>

      {showCreateSetModal && <AddSetModal setExerciseSets={setExerciseSets} />}
    </Modal>
  );
}
