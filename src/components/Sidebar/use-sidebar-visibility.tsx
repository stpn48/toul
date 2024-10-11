import { create } from "zustand";

interface Store {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean | ((prev: boolean) => boolean)) => void;
}
export const useSidebarVisibility = create<Store>((set) => ({
  showSidebar: true,
  setShowSidebar: (showSidebar) =>
    set((state) => ({
      showSidebar: typeof showSidebar === "function" ? showSidebar(state.showSidebar) : showSidebar,
    })),
}));
