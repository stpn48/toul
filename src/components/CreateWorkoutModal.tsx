"use client";

import { createWorkout } from "@/app/actions/createWorkout";
import { useOptimisticWorkouts } from "@/context/useOptimisticWorkouts";
import { useModalVisibility } from "@/store/useModalVisiblity";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import Button from "./Button";
import Input from "./Input";
import { Modal } from "./Modal";
import Select from "./Select";
import Textarea from "./Textarea";

export function CreateWorkoutModal() {
  const { showCreateWorkoutModal, setShowCreateWorkoutModal } = useModalVisibility();
  const { addWorkout } = useOptimisticWorkouts();

  const [workoutName, setWorkoutName] = useState<string | null>(null);
  const [workoutDescription, setWorkoutDescription] = useState<string | null>(null);
  const [workoutDifficulty, setWorkoutDifficulty] = useState<string>("Hard");
  const [workoutEstimatedDuration, setWorkoutEstimatedDuration] = useState<string>("45 min");

  const handleCreateWorkout = useCallback(async () => {
    if (workoutName === null) {
      // set the name to "" bcs when the name is null it would not show the error
      setWorkoutName("");
      return;
    }

    const newWorkout = {
      createdAt: new Date(),
      id: uuidv4(),
      userId: "1",
      timesCompleted: 0,
      name: workoutName,
      description: workoutDescription,
      difficulty: workoutDifficulty,
      estimatedDuration: workoutEstimatedDuration,
      exercises: [],
      lastCompletedAt: null,
    };

    addWorkout(newWorkout);
    setShowCreateWorkoutModal(false);

    // reset state
    setWorkoutName(null);
    setWorkoutDescription(null);
    setWorkoutDifficulty("Hard");
    setWorkoutEstimatedDuration("45 min");

    const { error } = await createWorkout(workoutName, workoutDescription, workoutDifficulty, workoutEstimatedDuration);

    if (error) {
      toast.error(error);
      return;
    }
  }, [workoutDescription, workoutDifficulty, workoutEstimatedDuration, workoutName, setShowCreateWorkoutModal, addWorkout]);

  if (!showCreateWorkoutModal) {
    return null;
  }

  return (
    <Modal
      transparentBackdrop
      closeModal={() => setShowCreateWorkoutModal(false)}
      className="custom-shadow flex h-fit w-fit flex-col gap-4 p-10 px-[100px] dark:bg-dark-secondary"
    >
      <h1 className="text-2xl font-bold">Create Workout</h1>
      <Input
        value={workoutName || ""}
        onChange={(e) => setWorkoutName(e.target.value)}
        className="w-full"
        placeholder="Workout Name"
        error={workoutName === ""}
        errorLabel={"This field is required"}
      />
      <Textarea
        value={workoutDescription || ""}
        onChange={(e) => setWorkoutDescription(e.target.value)}
        className="w-full"
        placeholder="Workout Description (optional)"
      />
      <div className="flex w-full justify-between">
        <Select label="Difficulty" value={workoutDifficulty} setValue={setWorkoutDifficulty} options={["Hard"]} />
        <Select
          label="Estimated Duration"
          value={workoutEstimatedDuration}
          setValue={setWorkoutEstimatedDuration}
          options={["15 min", "30 min", "45 min", "60 min", "75 min", "90 min", "120 min"]}
        />
      </div>
      <Button onClick={handleCreateWorkout}>Create</Button>
    </Modal>
  );
}
