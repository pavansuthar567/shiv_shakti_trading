import { SubscriptionPlan, UserSubscription } from "@/lib/types";
import { create } from "zustand";

type SubscriptionState = {
  plans: SubscriptionPlan[];
  activeSubscription: UserSubscription | null;
  userSubscriptions: UserSubscription[];
  isLoading: boolean;
  error: string | null;
};

type SubscriptionActions = {
  setPlans: (plans: SubscriptionPlan[]) => void;
  setActiveSubscription: (subscription: UserSubscription | null) => void;
  setUserSubscriptions: (subscriptions: UserSubscription[]) => void;
  addSubscription: (subscription: UserSubscription) => void;
  updateSubscription: (id: string, updates: Partial<UserSubscription>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

export const useSubscriptionStore = create<SubscriptionState & SubscriptionActions>((set, get) => ({
  plans: [],
  activeSubscription: null,
  userSubscriptions: [],
  isLoading: false,
  error: null,

  setPlans: (plans) => set({ plans }),
  setActiveSubscription: (subscription) => set({ activeSubscription: subscription }),
  setUserSubscriptions: (subscriptions) => set({ userSubscriptions: subscriptions }),
  
  addSubscription: (subscription) => {
    const { userSubscriptions } = get();
    set({ userSubscriptions: [...userSubscriptions, subscription] });
  },
  
  updateSubscription: (id, updates) => {
    const { userSubscriptions, activeSubscription } = get();
    const updateArray = (arr: UserSubscription[]) =>
      arr.map((item) => (item._id === id ? { ...item, ...updates } : item));
    
    set({
      userSubscriptions: updateArray(userSubscriptions),
      activeSubscription: activeSubscription?._id === id 
        ? { ...activeSubscription, ...updates }
        : activeSubscription,
    });
  },
  
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
