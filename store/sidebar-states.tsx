import { create } from "zustand";

interface SideBarStateProps {
  collaspe: boolean;
  onCollaspe: () => void;
  onExpand: () => void;
}

export const useSidebarState = create<SideBarStateProps>((set) => ({
  collaspe: false,
  onCollaspe: () => set({ collaspe: true }),
  onExpand: () => set({ collaspe: false }),
}));

// onCollaspe => sidebar lai collaspe gardincha.
// onExpand   => sidebar lai expand gardincha .
