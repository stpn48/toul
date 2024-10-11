import { create } from "zustand";

type Store = {
  showCreateWorkoutModal: boolean;
  setShowCreateWorkoutModal: (val: boolean) => void;
};
export const useModalVisibility = create<Store>((set) => ({
  showCreateWorkoutModal: false,
  setShowCreateWorkoutModal: (val) => set({ showCreateWorkoutModal: val }),
}));
