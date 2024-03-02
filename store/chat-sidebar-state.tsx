import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

interface ChatSidebarStateProps {
  collasped: boolean;
  variant: ChatVariant;
  onCollaspe: () => void;
  onExpand: () => void;
  onChangeVariant: (variant: ChatVariant) => void;
}

export const useChatSidebarState = create<ChatSidebarStateProps>((set) => ({
  collasped: false,
  variant: ChatVariant.CHAT,
  onCollaspe: () => set({ collasped: true }),
  onExpand: () => set({collasped:false}),
  onChangeVariant: (variant:ChatVariant) => set({variant}),
}));
