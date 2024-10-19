import { ExerciseWithSets } from "@/types/types";
import { create } from "zustand";

type Store = {
  showCreateWorkoutModal: boolean;
  setShowCreateWorkoutModal: (val: boolean) => void;

  showCreateExerciseModal: boolean;
  setShowCreateExerciseModal: (val: boolean) => void;

  showCreateSetModal: boolean;
  setShowCreateSetModal: (val: boolean) => void;

  showEditExerciseModal: boolean;
  setShowEditExerciseModal: (val: boolean) => void;

  editingExerciseDetails: ExerciseWithSets | null;
  setEditingExerciseDetails: (val: ExerciseWithSets | null) => void;

  showLogWorkoutModal: boolean;
  setShowLogWorkoutModal: (val: boolean) => void;

  resetStore: () => void;
};
export const useModalVisibility = create<Store>((set) => ({
  showCreateWorkoutModal: false,
  setShowCreateWorkoutModal: (val) => set({ showCreateWorkoutModal: val }),

  showCreateExerciseModal: false,
  setShowCreateExerciseModal: (val) => set({ showCreateExerciseModal: val }),

  showCreateSetModal: false,
  setShowCreateSetModal: (val) => set({ showCreateSetModal: val }),

  showEditExerciseModal: false,
  setShowEditExerciseModal: (val) => set({ showEditExerciseModal: val }),

  editingExerciseDetails: null,
  setEditingExerciseDetails: (val) => set({ editingExerciseDetails: val }),

  showLogWorkoutModal: false,
  setShowLogWorkoutModal: (val) => set({ showLogWorkoutModal: val }),

  resetStore: () =>
    set({
      showCreateExerciseModal: false,
      showEditExerciseModal: false,
      showLogWorkoutModal: false,
      editingExerciseDetails: null,
    }),
}));
