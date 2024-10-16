"use client";

import { logWorkout } from "@/app/actions/logWorkout";
import Button from "@/components/Button";
import { useLogWorkoutStore } from "@/store/useLogWorkoutStore";
import { useModalVisibility } from "@/store/useModalVisiblity";
import { ExerciseWithSets } from "@/types/types";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import toast from "react-hot-toast";

type Props = {
  exercises: ExerciseWithSets[];
};

export function SliderButtons({ exercises }: Props) {
  const { currExerciseIndex, setCurrExerciseIndex, canGoNext, loggedExercises, resetStore } = useLogWorkoutStore();

  const { resetStore: resetModalVisibilityStore } = useModalVisibility();

  const router = useRouter();

  const handleLogWorkout = useCallback(async () => {
    toast.loading("Logging Workout..");

    await logWorkout(exercises[0].workoutId, loggedExercises); // workotutId is the same for all exercise
    toast.dismiss();

    resetStore();
    toast.success("Workout logged successfully!");

    // close modal
    resetModalVisibilityStore();
  }, [loggedExercises, exercises, resetModalVisibilityStore, router]);

  const handleNextClick = useCallback(() => {
    if (currExerciseIndex === exercises.length - 1) {
      handleLogWorkout();
      return;
    }

    setCurrExerciseIndex((prev) => (prev < exercises.length - 1 ? prev + 1 : prev));
  }, [setCurrExerciseIndex, exercises.length, currExerciseIndex, handleLogWorkout]);

  const handlePrevClick = useCallback(() => {
    setCurrExerciseIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, [setCurrExerciseIndex]);

  return (
    <div className="pointer-events-none fixed z-10 flex w-screen justify-between">
      {currExerciseIndex !== 0 && (
        <Button className="pointer-events-auto absolute left-6 rounded-md p-2" onClick={handlePrevClick}>
          <ArrLeft />
        </Button>
      )}
      <Button className="pointer-events-auto absolute right-6 p-2" disabled={!canGoNext} onClick={handleNextClick}>
        {currExerciseIndex === exercises.length - 1 && <CheckCircle />}
        {currExerciseIndex !== exercises.length - 1 && <ArrRight />}
      </Button>
    </div>
  );
}

function CheckCircle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ArrLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}

function ArrRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  );
}
