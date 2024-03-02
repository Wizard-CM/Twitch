import { create } from "zustand";

interface useDashboardSideBarStateProps {
  collaspe: boolean;
  onCollaspe: () => void;
  onExpand: () => void;
}
export const useDashboardSideBarState = create<useDashboardSideBarStateProps>(
  (set) => ({
    collaspe: false,
    onCollaspe: () => set({ collaspe: true }),
    onExpand: () => set({ collaspe: false }),
  })
);
// onCollaspe => sidebar lai collaspe gardincha.
// onExpand   => sidebar lai expand gardincha .
