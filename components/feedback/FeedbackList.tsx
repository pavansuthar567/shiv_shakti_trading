"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { Star, StarIcon, User } from "lucide-react";
import { useEffect, useState } from "react";

interface FeedbackListProps {
  productId: string;
  userId?: string;
}

export default function FeedbackList({ productId, userId }: FeedbackListProps) {
  const { productFeedback, setProductFeedback, deleteFeedback, isLoading } = useFeedbackStore();
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeedback();
  }, [productId]);

  const fetchFeedback = async () => {
    try {
      const response = await fetch(`/api/feedback?productId=${productId}`);
      if (response.ok) {
        const data = await response.json();
        setProductFeedback(data.feedback);
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error);
    }
  };

  const handleDeleteFeedback = async (feedbackId: string) => {
    try {
      const response = await fetch(`/api/feedback/${feedbackId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        deleteFeedback(feedbackId);
        toast({
          title: "Feedback deleted",
          description: "Your feedback has been removed.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete feedback.",
        variant: "destructive",
      });
    }
  };

  const displayFeedback = showAll ? productFeedback : productFeedback.slice(0, 3);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (productFeedback.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Customer Reviews ({productFeedback.length})
      </h3>
      
      <div className="space-y-4">
        {displayFeedback.map((feedback) => (
          <div key={feedback._id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  {feedback.anonymous ? (
                    <User className="w-4 h-4 text-gray-600" />
                  ) : (
                    <span className="text-sm font-medium">
                      {feedback.userId.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">
                    {feedback.anonymous ? "Anonymous User" : `User ${feedback.userId.slice(-4)}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {userId && feedback.userId === userId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteFeedback(feedback._id)}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= feedback.rating ? (
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ) : (
                    <Star className="w-4 h-4 text-gray-300" />
                  )}
                </span>
              ))}
            </div>
            
            <p className="mt-2 text-gray-700">{feedback.comment}</p>
          </div>
        ))}
      </div>
      
      {productFeedback.length > 3 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="w-full"
          >
            {showAll ? "Show Less" : `Show All ${productFeedback.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
}
