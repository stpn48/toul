"use client";

import { CreateSet, ExerciseWithSets } from "@/types/types";
import { Workout } from "@prisma/client";
import { createContext, useCallback, useContext, useMemo, useOptimistic } from "react";
import { v4 as uuidv4 } from "uuid";

type OptimisticContext = {
  optimisticWorkouts: Workout[];
  optimisticExercises: ExerciseWithSets[];
  addWorkout: (workout: Workout) => void;
  removeWorkout: (workoutId: string) => void;
  addExerciseOptimistic: (exercise: ExerciseWithSets) => void;
  updateOptimisticExercise: (
    exerciseId: string,
    exerciseName: string,
    exerciseDescription: string | null,
    exerciseSets: CreateSet[],
  ) => void;
  removeOptimisticExercise: (exerciseId: string) => void;
};

const optimisticContext = createContext<OptimisticContext | null>(null);

type Props = {
  children: React.ReactNode;
  initialWorkouts: Workout[];
  initialExercises: ExerciseWithSets[];
};

export function OptimisticWorkoutsProvider({ children, initialWorkouts, initialExercises }: Props) {
  const [optimisticWorkouts, setOptimisticWorkouts] = useOptimistic(initialWorkouts);
  const [optimisticExercises, setOptimisticExercises] = useOptimistic(initialExercises);

  //TODO: Fix naming of these functions
  const addWorkout = useCallback(
    (newWorkout: Workout) => {
      setOptimisticWorkouts((prev) => [...prev, newWorkout]);
    },
    [setOptimisticWorkouts],
  );

  const removeWorkout = useCallback(
    (workoutId: string) => {
      setOptimisticWorkouts((prev) => prev.filter((workout) => workout.id !== workoutId));
    },
    [setOptimisticWorkouts],
  );

  const addExerciseOptimistic = useCallback(
    (newExercise: ExerciseWithSets) => {
      setOptimisticExercises((prev) => [...prev, newExercise]);
    },
    [setOptimisticExercises],
  );

  const removeOptimisticExercise = useCallback(
    (exerciseId: string) => {
      setOptimisticExercises((prev) => prev.filter((exercise) => exercise.id !== exerciseId));
    },
    [setOptimisticExercises],
  );

  const updateOptimisticExercise = useCallback(
    (exerciseId: string, exerciseName: string, exerciseDescription: string | null, exerciseSets: CreateSet[]) => {
      setOptimisticExercises((prev) => {
        const updatedExercises = [...prev];
        const index = updatedExercises.findIndex((exercise) => exercise.id === exerciseId);

        // If exercise doesn't exist, handle this gracefully
        if (index === -1) {
          return updatedExercises;
        }

        // Replace the old exercise with the new updated one
        updatedExercises[index] = {
          ...updatedExercises[index],
          name: exerciseName,
          description: exerciseDescription,
          sets: exerciseSets.map((set) => ({
            name: set.name,
            targetReps: set.targetReps,
            id: uuidv4(),
            createdAt: new Date(),
            exerciseId,
          })),
        };

        return updatedExercises;
      });
    },
    [setOptimisticExercises],
  );

  const value = useMemo(
    () => ({
      optimisticWorkouts,
      optimisticExercises,
      addWorkout,
      removeWorkout,
      addExerciseOptimistic,
      updateOptimisticExercise,
      removeOptimisticExercise,
    }),
    [
      optimisticWorkouts,
      optimisticExercises,
      addWorkout,
      removeWorkout,
      addExerciseOptimistic,
      updateOptimisticExercise,
      removeOptimisticExercise,
    ],
  );

  return <optimisticContext.Provider value={value}>{children}</optimisticContext.Provider>;
}

export function useOptimisticWorkouts() {
  const context = useContext(optimisticContext);

  if (!context) {
    throw new Error("useOptimisticWorkouts must be used within a optimisticWorkoutsProvider");
  }

  return context;
}
