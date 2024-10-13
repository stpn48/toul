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

  editingExerciseId: string | null;
  setEditingExerciseId: (val: string | null) => void;
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

  editingExerciseId: null,
  setEditingExerciseId: (val) => set({ editingExerciseId: val }),
}));
