"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLocalStorage } from "@/lib/hooks/useIsMounted";
import { useAuthStore } from "@/store/useAuthStore";
import { Actions, Product, State, useCartStore } from "@/store/useCartStore";
import { ShoppingCartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import CartProductCard from "./CartProductCard";

type UserDetails = {
  user?: {
    name?: string;
    email?: string;
  };
} | null;

export default function CartSheet() {
  const router = useRouter();

  const { isSignedIn } = useAuthStore();
  const { cart, removeFromCart, addToCart, deleteFromCart }: Actions & State =
    useCartStore();

  const [userDetails, setUserDetails, mounted] = useLocalStorage<UserDetails>(
    "userDetails",
    null,
  );

  const currentUser = useMemo(() => {
    // const user = fhelper.getUserDetails();
    // return user?.user;
    if (!mounted) return null; // Return null during SSR and initial render
    return userDetails?.user;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, mounted, userDetails]);

  return (
    <div className="flex items-center">
      {mounted && currentUser && (
        <span className="mr-2 text-sm font-bold text-red-500">
          {currentUser?.name}
        </span>
      )}
      {/* <Sheet open={open} onOpenChange={setOpen}> */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"} className="relative" size="icon">
            <ShoppingCartIcon size={15} />
            {cart.length > 0 && (
              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary"></div>
            )}
            <span className="sr-only">Cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col p-2">
          <SheetHeader className="p-2">
            <SheetTitle>Cart</SheetTitle>
          </SheetHeader>
          <SheetDescription className="text-gray-500">
            {cart.length > 0 ? "" : "Empty"}
          </SheetDescription>
          <div className="overflow-y-auto">
            {cart.map((product: Product, index: number) => (
              <CartProductCard
                key={index}
                product={product}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                deleteFromCart={deleteFromCart}
              />
            ))}
          </div>
          <SheetFooter>
            <Button
              variant="default"
              onClick={() => {
                // setOpen(false);
                router.push("/cart");
              }}
              className="w-full"
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
