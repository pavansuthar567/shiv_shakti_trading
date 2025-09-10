"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Product, ProductSize } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { fabricLabels } from "../../_helpers/constants";
import AddToCartButton from "../cart/AddToCartButton";
import FeedbackForm from "../feedback/FeedbackForm";
import FeedbackList from "../feedback/FeedbackList";
import ProductCarousel from "./ProductCarousel";

export default function ProductDetailCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState(false);

  const availableSizes: ProductSize[] = useMemo(
    () =>
      product.sizes && product.sizes.length > 0
        ? product.sizes
        : [{ size: product.size, available: true, quantity: 10 }],
    [product.sizes, product.size],
  );

  // Set default size to first available size
  useEffect(() => {
    if (availableSizes.length > 0 && !selectedSize) {
      const firstAvailableSize = availableSizes.find((size) => size.available);
      if (firstAvailableSize) {
        setSelectedSize(firstAvailableSize.size);
      } else if (availableSizes.length > 0) {
        setSelectedSize(availableSizes[0].size);
      }
    }
  }, [availableSizes, selectedSize]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const productWithSize = {
    ...product,
    selectedSize,
  };

  return (
    <div className="space-y-8">
      <section className="flex w-full flex-col py-4 md:flex-row">
        <ProductCarousel product={product} />
        <div className="flex w-full flex-col space-y-2 px-0 py-2 md:w-1/2 md:px-4 lg:px-12">
          <h1 className="p-2 text-xl font-bold md:text-2xl">{product.name}</h1>
          <h2 className="p-2 text-xl font-medium text-primary">
            Price: ₹ {product.price}
            <span className="px-2 text-xs text-foreground">
              (including GST)
            </span>
          </h2>

          {/* Size Selection */}
          {availableSizes.length > 1 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Size:</label>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((sizeOption) => (
                  <button
                    key={sizeOption.size}
                    onClick={() => handleSizeSelect(sizeOption.size)}
                    disabled={!sizeOption.available}
                    className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                      selectedSize === sizeOption.size
                        ? "border-primary bg-primary text-white"
                        : sizeOption.available
                          ? "border-gray-300 hover:border-primary hover:bg-gray-50"
                          : "cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400"
                    }`}
                  >
                    {sizeOption.size}
                    {!sizeOption.available && " (Out of Stock)"}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="text-nowrap">Product Code:</TableCell>
                <TableCell>{product.productId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-nowrap">Brand:</TableCell>
                <TableCell>{product?.brand?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Size:</TableCell>
                <TableCell>{selectedSize || "Select Size"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fabric:</TableCell>
                <TableCell>
                  {product?.fabric
                    ? fabricLabels[
                        product.fabric as keyof typeof fabricLabels
                      ] || product.fabric
                    : ""}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Color:</TableCell>
                <TableCell>{product.color}</TableCell>
              </TableRow>
              {product.description && (
                <TableRow>
                  <TableCell>Description:</TableCell>
                  <TableCell>{product.description}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="pt-2">
            <AddToCartButton product={productWithSize} />
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="border-t pt-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Customer Reviews</h2>
          <button
            onClick={() => setShowFeedback(!showFeedback)}
            className="text-primary hover:underline"
          >
            {showFeedback ? "Hide Review Form" : "Write a Review"}
          </button>
        </div>

        {showFeedback && (
          <div className="mb-8">
            <FeedbackForm
              productId={product._id}
              onSubmit={() => setShowFeedback(false)}
            />
          </div>
        )}

        <FeedbackList productId={product._id} />
      </section>
    </div>
  );
}
