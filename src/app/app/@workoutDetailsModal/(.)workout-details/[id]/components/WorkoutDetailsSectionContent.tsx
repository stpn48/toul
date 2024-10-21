"use client";

import { updateWorkoutDetails } from "@/app/actions/updateWorkoutDetails";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import { Workout } from "@prisma/client";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

type Props = {
  workout: Workout;
};

export function WorkoutDetailsSectionContent({ workout }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [workoutName, setWorkoutName] = useState<string | null>(workout.name);
  const [workoutDescription, setWorkoutDescription] = useState<string | null>(workout.description);
  const [workoutEstimatedDuration, setWorkoutEstimatedDuration] = useState<string>(workout.estimatedDuration);

  const handleUpdateWorkoutDetails = useCallback(async () => {
    if (!workoutName) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsEditing(false);

    const { error } = await updateWorkoutDetails(workoutName, workoutDescription, workoutEstimatedDuration, workout.id);

    if (error) {
      toast.error(error);
      return;
    }
  }, [workoutName, workoutDescription, workoutEstimatedDuration, workout.id]);

  const handleStopEditing = useCallback(() => {
    // reset state if user cancels editing
    setWorkoutName(workout.name);
    setWorkoutDescription(workout.description);
    setWorkoutEstimatedDuration(workout.estimatedDuration);

    setIsEditing(false);
  }, [
    setWorkoutName,
    setWorkoutDescription,
    setWorkoutEstimatedDuration,
    workout.name,
    workout.description,
    workout.estimatedDuration,
  ]);

  return (
    <>
      {/* backdrop when is editing */}
      {isEditing && (
        <div
          className="fixed inset-0 z-20 h-screen w-screen bg-stone-400 bg-opacity-50 dark:bg-stone-900 dark:bg-opacity-60"
          onClick={handleStopEditing}
        />
      )}

      <div
        onClick={() => setIsEditing(true)}
        className={twMerge(
          "box-border rounded-lg border border-transparent bg-inherit p-4",
          isEditing && "z-20 border-hover dark:border-dark-hover",
        )}
      >
        <div className="flex flex-row flex-wrap gap-4 lg:flex-col">
          <div className="w-full">
            <Input
              disableLabel
              placeholder="Workout Name"
              className="w-full border-0 bg-inherit px-0 pb-0 text-lg font-bold text-black dark:text-white"
              value={workoutName || ""}
              onChange={(e) => {
                setWorkoutName(e.target.value);
              }}
            />
            <Input
              disableLabel
              placeholder="Workout Description"
              className="w-full border-0 bg-inherit px-0 pt-0 text-black dark:text-white"
              value={workoutDescription || ""}
              onChange={(e) => {
                setWorkoutDescription(e.target.value);
              }}
            />
          </div>
          <div className="flex min-w-[150px] flex-col">
            <h1 className="text-xs font-bold text-secondary">DIFFICULTY</h1>
            <p>{workout.difficulty}</p>
          </div>
          <div className="flex min-w-[150px] flex-col">
            <h1 className="text-xs font-bold text-secondary">ESTIMATED DURATION</h1>
            <Select
              className="border-0 bg-inherit px-0"
              disableLabel
              value={workoutEstimatedDuration}
              setValue={setWorkoutEstimatedDuration}
              options={["15 min", "30 min", "45 min", "60 min", "75 min", "90 min", "120 min"]}
            />
          </div>
          <div className="flex min-w-[150px] flex-col">
            <h1 className="text-xs font-bold text-secondary">CREATED</h1>
            <p>{workout.createdAt.toLocaleDateString()}</p>
          </div>
          <div className="flex min-w-[150px] flex-col">
            <h1 className="text-xs font-bold text-secondary">TIMES COMPLETED</h1>
            <p>{workout.timesCompleted}</p>
          </div>
          <div className="flex min-w-[150px] flex-col">
            <h1 className="text-xs font-bold text-secondary">LAST COMPLETED</h1>
            <p>{workout.lastCompletedAt?.toLocaleDateString() || "Not completed yet"}</p>
          </div>
        </div>

        <div className={twMerge("mt-4 flex w-full justify-end gap-2", !isEditing && "hidden")}>
          <Button
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleStopEditing();
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateWorkoutDetails();
            }}
          >
            Edit
          </Button>
        </div>
      </div>
    </>
  );
}
