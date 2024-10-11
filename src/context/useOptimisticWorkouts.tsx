"use client";

import { Workout } from "@prisma/client";
import { createContext, useCallback, useContext, useMemo, useOptimistic } from "react";

type OptimisticContext = {
  optimisticWorkouts: Workout[];
  addWorkout: (workout: Workout) => void;
  removeWorkout: (workoutId: string) => void;
};

const optimisticContext = createContext<OptimisticContext | null>(null);

type Props = {
  children: React.ReactNode;
  initialWorkouts: Workout[];
};

export function OptimisticWorkoutsProvider({ children, initialWorkouts }: Props) {
  const [optimisticWorkouts, setOptimisticWorkouts] = useOptimistic(initialWorkouts);

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

  const value = useMemo(
    () => ({
      optimisticWorkouts,
      addWorkout,
      removeWorkout,
    }),
    [optimisticWorkouts, addWorkout, removeWorkout],
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
