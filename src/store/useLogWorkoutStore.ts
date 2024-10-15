import { create } from "zustand";

export type LoggedExercises = {
  [name: string]: number[];
};

type LogWorkoutState = {
  currExerciseIndex: number;
  loggedExercises: LoggedExercises;
  canGoNext: boolean;
  setCurrExerciseIndex: (index: number | ((prevIndex: number) => number)) => void;
  setLoggedExercises: (val: LoggedExercises | ((prev: LoggedExercises) => LoggedExercises)) => void;
  setCanGoNext: (status: boolean) => void;
};

export const useLogWorkoutStore = create<LogWorkoutState>((set) => ({
  currExerciseIndex: 0,
  loggedExercises: {},
  canGoNext: false,
  setCurrExerciseIndex: (index) =>
    set((state) => ({
      currExerciseIndex: typeof index === "function" ? index(state.currExerciseIndex) : index,
    })),
  setLoggedExercises: (val) =>
    set((state) => ({
      loggedExercises: typeof val === "function" ? val(state.loggedExercises) : val,
    })),
  setCanGoNext: (status) => set({ canGoNext: status }),
}));
