"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useFeedbackStore } from "@/store/useFeedbackStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star, StarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const feedbackSchema = z.object({
  rating: z.number().min(1, "Rating is required"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
  anonymous: z.boolean().default(false),
});

type FeedbackFormData = z.infer<typeof feedbackSchema>;

interface FeedbackFormProps {
  productId: string;
  userId: string;
  onSubmit?: () => void;
}

export default function FeedbackForm({ productId, userId, onSubmit }: FeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();
  const { addFeedback, setLoading } = useFeedbackStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      anonymous: false,
    },
  });

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmitFeedback = async (data: FeedbackFormData) => {
    try {
      setLoading(true);
      
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          userId,
          rating,
          comment: data.comment,
          anonymous: data.anonymous,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }

      const result = await response.json();
      
      // Add to local store
      addFeedback(result.feedback);
      
      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback.",
        className: "border-green-600 text-green-800",
      });

      reset();
      setRating(0);
      onSubmit?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Write a Review</h3>
      
      <form onSubmit={handleSubmit(handleSubmitFeedback)} className="space-y-4">
        {/* Rating */}
        <div>
          <Label className="text-sm font-medium">Rating *</Label>
          <div className="flex items-center space-x-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                {star <= (hoverRating || rating) ? (
                  <StarIcon className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                ) : (
                  <Star className="h-6 w-6 text-gray-300" />
                )}
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <Label htmlFor="comment" className="text-sm font-medium">
            Comment *
          </Label>
          <Textarea
            id="comment"
            {...register("comment")}
            placeholder="Share your experience with this product..."
            className="mt-2 min-h-[100px] resize-none"
          />
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
          )}
        </div>

        {/* Anonymous Toggle */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="anonymous"
            {...register("anonymous")}
            className="h-4 w-4 rounded border-gray-300"
          />
          <Label htmlFor="anonymous" className="text-sm font-medium">
            Submit anonymously
          </Label>
        </div>

        <Button
          type="submit"
          disabled={rating === 0}
          className="w-full"
        >
          Submit Feedback
        </Button>
      </form>
    </div>
  );
}
