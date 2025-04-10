"use client";

import { Button } from "@/components/ui/button";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
// import { fhelper } from "@/_helpers";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useEffect } from "react";
import SignOutModal from "./SignOutModal";

interface SignInModalProps {
  isFromMenuSheet?: boolean;
  isFromCart?: boolean;
  isFromOrder?: boolean;
  onPlaceOrder?: () => void;
}

const SignInSignUpModal: React.FC<SignInModalProps> = ({
  isFromMenuSheet,
  isFromCart,
  isFromOrder,
  onPlaceOrder,
}) => {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(false);

  const { totalItems } = useCartStore();
  const {
    isSignIn,
    isSignUp,
    isSignOut,
    isSignedIn: isLoggedIn,
    setIsSignIn,
    setIsSignUp,
    setIsSignOut,
  } = useAuthStore();

  console.log("isLoggedIn", isLoggedIn);

  useEffect(() => {}, [isLoggedIn]);

  // useEffect(() => {
  //   const isUserLoggedIn = fhelper.isUserLoggedIn();
  //   setIsLoggedIn(isUserLoggedIn);
  // }, [isSignIn, isSignUp, isSignOut]);

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

  console.log("isSignIn", isSignIn);

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
          {isLoggedIn === true && !isFromOrder && (
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
