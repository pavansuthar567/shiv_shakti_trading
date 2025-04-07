"use client";

import { Button } from "@/components/ui/button";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import { fhelper } from "@/_helpers";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";
import SignOutModal from "./SignOutModal";

interface SignInModalProps {
  isFromMenuSheet?: boolean;
  isFromCart?: boolean;
  onPlaceOrder?: () => void;
}

const SignInSignUpModal: React.FC<SignInModalProps> = ({
  isFromMenuSheet,
  isFromCart,
  onPlaceOrder,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  const { totalItems } = useCartStore();
  const {
    isSignIn,
    isSignUp,
    isSignOut,
    setIsSignIn,
    setIsSignUp,
    setIsSignOut,
  } = useAuthStore();

  useEffect(() => {
    const isUserLoggedIn = fhelper.isUserLoggedIn();
    setIsLoggedIn(isUserLoggedIn);
  }, [isSignIn, isSignUp, isSignOut]);

  const onSignUpClick = () => {
    setIsSignIn(false);
    setIsSignUp(true);
  };

  const onSignInClick = () => {
    setIsSignUp(false);
    setIsSignIn(true);
  };

  const onSignOutClick = () => {
    setIsSignUp(false);
    setIsSignIn(false);
    setIsSignOut(true);
  };

  const onClickPlaceOrder = () => {
    if (isLoggedIn === null) {
      onSignUpClick();
    } else if (!isLoggedIn) {
      onSignInClick();
    } else {
      if (onPlaceOrder) onPlaceOrder();
    }
  };

  return (
    <div className="ml-4 pt-3 text-sm">
      {isFromMenuSheet && (
        <>
          {isLoggedIn === false && (
            <Button onClick={onSignInClick}>Sign In</Button>
          )}
          {isLoggedIn === null && (
            <Button onClick={onSignUpClick}>Sign Up</Button>
          )}
          {isLoggedIn === true && (
            <Button onClick={onSignOutClick}>Sign Out</Button>
          )}
        </>
      )}

      {isFromCart && totalItems > 0 && (
        <Button onClick={onClickPlaceOrder}>Place Order</Button>
      )}

      {isSignIn && <SignInModal key={"SignInModal"} />}
      {isSignUp && <SignUpModal key={"SignUpModal"} />}
      {isSignOut && <SignOutModal key={"SignOutModal"} />}
    </div>
  );
};

export default SignInSignUpModal;
