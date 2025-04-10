import { create } from "zustand";
// import { persist } from "zustand/middleware";

type AuthState = {
  isSignUp: boolean;
  isSignIn: boolean;
  isSignOut: boolean;
  isSignedIn: boolean | null;
};

type AuthActions = {
  setIsSignUp: (value: boolean) => void;
  setIsSignIn: (value: boolean) => void;
  setIsSignOut: (value: boolean) => void;
  setIsSignedIn: (value: boolean | null) => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  isSignUp: false,
  isSignIn: false,
  isSignOut: false,
  isSignedIn: null,
  setIsSignUp: (value) => set({ isSignUp: value }),
  setIsSignIn: (value) => set({ isSignIn: value }),
  setIsSignOut: (value) => set({ isSignOut: value }),
  setIsSignedIn: (value) => set({ isSignedIn: value }),
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
