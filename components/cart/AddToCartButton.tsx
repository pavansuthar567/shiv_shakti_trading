"use client";

import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/lib/types";
import { Actions, State, useCartStore } from "@/store/useCartStore";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ToastAction } from "../ui/toast";

export default function AddToCartButton({ product }: { product: Product & { selectedSize?: string } }) {
  const { toast } = useToast();
  const { addToCart, cart }: Actions & State = useCartStore();
  const router = useRouter();

  const cartProduct = {
    ...product,
    selectedSize: product.selectedSize || product.size,
  };

  // Check if product with same size is already in cart
  const productInCart = cart.find(
    (item) => 
      item._id === product._id && 
      item.selectedSize === cartProduct.selectedSize
  );

  const handleAddToCart = () => {
    if (!cartProduct.selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before adding to cart.",
        variant: "destructive",
      });
      return;
    }

    addToCart(cartProduct);
    toast({
      title: "Item added to cart!",
      action: (
        <Link href="/cart">
          <ToastAction altText="View Cart">View Cart</ToastAction>
        </Link>
      ),
      className: "border border-green-600 text-pretty",
    });
  };

  const handleBuyNow = () => {
    if (!cartProduct.selectedSize) {
      toast({
        title: "Size Required",
        description: "Please select a size before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (!productInCart?.quantity) {
      addToCart(cartProduct);
    }
    router.push("/cart");
  };

  return (
    <>
      <Button
        onClick={handleAddToCart}
        variant="secondary"
        className="relative w-full rounded-full border transition duration-100 active:scale-95"
        disabled={!cartProduct.selectedSize}
      >
        <PlusIcon className="absolute left-0 ml-4 h-6 w-6" />
        {cartProduct.selectedSize ? "Add to Cart" : "Select Size First"}
      </Button>
      <Button
        onClick={handleBuyNow}
        variant="default"
        className="relative mt-2 w-full rounded-full border transition duration-100 active:scale-95"
        disabled={!cartProduct.selectedSize}
      >
        {cartProduct.selectedSize ? "Buy Now" : "Select Size First"}
      </Button>
    </>
  );
}
