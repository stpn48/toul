import { Filter } from "@/types/types";
import { Workout } from "@prisma/client";
import { create } from "zustand";

type Store = {
  query: string;
  setQuery: (query: string) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  filteredOptimisticWorkouts: Workout[];
  setFilteredOptimisticWorkouts: (workouts: Workout[] | ((prev: Workout[]) => Workout[])) => void;
};

export const useWorkoutListStore = create<Store>((set) => ({
  query: "",
  setQuery: (query) => set(() => ({ query })),
  filter: "a-z",
  setFilter: (filter) => set(() => ({ filter })),
  filteredOptimisticWorkouts: [],
  setFilteredOptimisticWorkouts: (workouts) =>
    set((state) => ({
      filteredOptimisticWorkouts: typeof workouts === "function" ? workouts(state.filteredOptimisticWorkouts) : workouts,
    })),
}));
