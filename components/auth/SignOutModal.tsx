"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
// import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";

const SignOutModal = () => {
  const { toast } = useToast();

  // const { clearCart } = useCartStore();
  const { setOrders, setSelectedOrder } = useOrderStore();
  const { isSignOut, setIsSignOut, setIsSignIn, setIsSignUp, setIsSignedIn } =
    useAuthStore();

  const handleConfirm = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("userDetails");
    setIsSignOut(false);
    setIsSignIn(false);
    setIsSignUp(false);
    setIsSignedIn(false);
    // clearCart();
    setOrders([]);
    setSelectedOrder(null);
    toast({ title: "Signed out successfully" });
  };

  return (
    <>
      <Dialog.Root open={isSignOut} onOpenChange={setIsSignOut}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-20 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-lg font-semibold">
                Confirm Sign Out
              </Dialog.Title>
              <Dialog.Close asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </Dialog.Close>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Are you sure you want to sign out?
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <Dialog.Close asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.Close>
              <Button variant="destructive" onClick={handleConfirm}>
                Sign Out
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

export default SignOutModal;
