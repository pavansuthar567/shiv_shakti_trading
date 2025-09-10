"use client";

import { useFeedbackStore } from "@/store/useFeedbackStore";
import { Star, StarIcon, User } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface FeedbackListProps {
  productId: string;
}

export default function FeedbackList({ productId }: FeedbackListProps) {
  const { productFeedback, setProductFeedback, isLoading } = useFeedbackStore();
  const [showAll, setShowAll] = useState(false);

  // Ensure productFeedback is always an array
  const safeProductFeedback = useMemo(() => {
    if (Array.isArray(productFeedback)) return productFeedback;
    if (!productFeedback) return [];
    // If it's an object with a feedback property, try to use that
    if (Array.isArray((productFeedback as any).feedback)) {
      return (productFeedback as any).feedback;
    }
    // If it's an object, try to convert to array
    if (typeof productFeedback === "object") {
      return Object.values(productFeedback);
    }
    return [];
  }, [productFeedback]);

  const fetchFeedback = useCallback(async () => {
    try {
      const response = await fetch(`/api/feedback?productId=${productId}`);
      if (response.ok) {
        const data = await response.json();
        // Defensive: ensure data.feedback is an array
        setProductFeedback(Array.isArray(data.feedback) ? data.feedback : []);
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  }, [productId, setProductFeedback]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback, productId]);

  const displayFeedback = showAll
    ? safeProductFeedback
    : safeProductFeedback.slice(0, 3);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="mb-2 h-4 w-1/4 rounded bg-gray-200"></div>
            <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  if (safeProductFeedback.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Customer Reviews ({safeProductFeedback.length})
      </h3>

      <div className="space-y-4">
        {displayFeedback.map((feedback: any) => (
          <div key={feedback._id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                  {feedback.anonymous ? (
                    <User className="h-4 w-4 text-gray-600" />
                  ) : (
                    <span className="text-sm font-medium">
                      {feedback.userId
                        ? feedback.userId.charAt(0).toUpperCase()
                        : "U"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {feedback.anonymous
                      ? "Anonymous User"
                      : `User ${feedback.userId ? feedback.userId.slice(-4) : "Unknown"}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= feedback.rating ? (
                    <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <Star className="h-4 w-4 text-gray-300" />
                  )}
                </span>
              ))}
            </div>

            <p className="mt-2 text-gray-700">{feedback.comment}</p>
          </div>
        ))}
      </div>

      {safeProductFeedback.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {showAll
              ? "Show Less"
              : `Show All ${safeProductFeedback.length} Reviews`}
          </button>
        </div>
      )}
    </div>
  );
}
