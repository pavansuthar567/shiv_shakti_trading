import { AIChatMessage } from "@/lib/types";
import { create } from "zustand";

type AIChatState = {
  chatHistory: AIChatMessage[];
  isTyping: boolean;
  isLoading: boolean;
  error: string | null;
};

type AIChatActions = {
  addMessage: (message: AIChatMessage) => void;
  setTyping: (typing: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearChat: () => void;
  clearError: () => void;
};

export const useAIChatStore = create<AIChatState & AIChatActions>((set) => ({
  chatHistory: [],
  isTyping: false,
  isLoading: false,
  error: null,

  addMessage: (message) =>
    set((state) => ({
      chatHistory: [...state.chatHistory, message],
    })),

  setTyping: (typing) => set({ isTyping: typing }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearChat: () => set({ chatHistory: [] }),
  clearError: () => set({ error: null }),
}));
