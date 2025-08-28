import { Feedback, FeedbackStats } from "@/lib/types";
import { create } from "zustand";

type FeedbackState = {
  productFeedback: Feedback[];
  userFeedback: Feedback[];
  stats: FeedbackStats | null;
  isLoading: boolean;
  error: string | null;
};

type FeedbackActions = {
  setProductFeedback: (feedback: Feedback[]) => void;
  setUserFeedback: (feedback: Feedback[]) => void;
  setStats: (stats: FeedbackStats) => void;
  addFeedback: (feedback: Feedback) => void;
  updateFeedback: (id: string, updates: Partial<Feedback>) => void;
  deleteFeedback: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

export const useFeedbackStore = create<FeedbackState & FeedbackActions>((set, get) => ({
  productFeedback: [],
  userFeedback: [],
  stats: null,
  isLoading: false,
  error: null,

  setProductFeedback: (feedback) => set({ productFeedback: feedback }),
  setUserFeedback: (feedback) => set({ userFeedback: feedback }),
  setStats: (stats) => set({ stats }),
  
  addFeedback: (feedback) => {
    const { productFeedback, userFeedback } = get();
    set({
      productFeedback: [...productFeedback, feedback],
      userFeedback: [...userFeedback, feedback],
    });
  },
  
  updateFeedback: (id, updates) => {
    const { productFeedback, userFeedback } = get();
    const updateArray = (arr: Feedback[]) =>
      arr.map((item) => (item._id === id ? { ...item, ...updates } : item));
    
    set({
      productFeedback: updateArray(productFeedback),
      userFeedback: updateArray(userFeedback),
    });
  },
  
  deleteFeedback: (id) => {
    const { productFeedback, userFeedback } = get();
    set({
      productFeedback: productFeedback.filter((item) => item._id !== id),
      userFeedback: userFeedback.filter((item) => item._id !== id),
    });
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
