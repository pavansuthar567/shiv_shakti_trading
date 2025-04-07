import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  isSignUp: boolean;
  isSignIn: boolean;
};

type AuthActions = {
  setIsSignUp: (value: boolean) => void;
  setIsSignIn: (value: boolean) => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isSignUp: false,
  isSignIn: false,
  setIsSignUp: (value) => set({ isSignUp: value }),
  setIsSignIn: (value) => set({ isSignIn: value }),
}));

// export const useAuthStore = create(
//   persist
//     <AuthState & AuthActions>(
//     (set) => ({
//       isSignUp: false,
//       isSignIn: false,
//       setIsSignUp: (value) => set({ isSignUp: value }),
//       setIsSignIn: (value) => set({ isSignIn: value }),
//     }),
//     {
//       name: "auth",
//     },
//   ),
// );
