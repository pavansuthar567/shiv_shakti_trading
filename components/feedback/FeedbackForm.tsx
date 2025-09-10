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
  onSubmit?: () => void;
}

export default function FeedbackForm({
  productId,
  onSubmit,
}: FeedbackFormProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();
  const { addFeedback, setLoading } = useFeedbackStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setValue,
    watch,
    trigger,
  } = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      anonymous: false,
    },
    mode: "onChange",
  });

  // Watch the rating value from the form
  const formRating = watch("rating");

  const handleRatingChange = async (newRating: number) => {
    console.log("Setting rating to:", newRating);
    setValue("rating", newRating);
    // Trigger validation for rating field
    await trigger("rating");
  };

  const handleSubmitFeedback = async (data: FeedbackFormData) => {
    console.log("Form submission started");
    console.log("Form data:", data);
    console.log("Form errors:", errors);
    console.log("Form valid:", isValid);

    // Double-check that rating is set
    if (!data.rating || data.rating < 1) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const payload = {
        productId,
        rating: data.rating,
        comment: data.comment,
        anonymous: data.anonymous,
      };

      console.log("Sending payload:", payload);

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error response:", errorData);
        throw new Error(errorData.message || "Failed to submit feedback");
      }

      const result = await response.json();
      console.log("Success response:", result);

      // Add to local store
      addFeedback(result.feedback);

      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback.",
        className: "border-green-600 text-green-800",
      });

      reset();
      onSubmit?.();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Test function to manually trigger form submission
  const testSubmission = () => {
    console.log("Testing form submission");
    console.log("Current form state:", {
      rating: formRating,
      errors,
      isValid,
      isSubmitting,
    });

    // Manually set a rating and comment for testing
    setValue("rating", 5);
    setValue(
      "comment",
      "This is a test comment with more than 10 characters to test the form validation.",
    );

    // Trigger validation
    trigger();
  };

  return (
    <div className="rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Write a Review</h3>

      {/* Test button - remove in production */}
      <Button
        type="button"
        onClick={testSubmission}
        className="mb-4 bg-blue-500 hover:bg-blue-600"
      >
        Test Form (Debug)
      </Button>

      <form onSubmit={handleSubmit(handleSubmitFeedback)} className="space-y-4">
        {/* Rating */}
        <div>
          <Label className="text-sm font-medium">Rating *</Label>
          <div className="mt-2 flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                {star <= (hoverRating || formRating) ? (
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
          {/* Debug info - remove in production */}
          <p className="mt-1 text-xs text-gray-500">
            Form rating: {formRating} | Valid: {isValid ? "Yes" : "No"} |
            Errors: {Object.keys(errors).length}
          </p>
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
            <p className="mt-1 text-sm text-red-600">
              {errors.comment.message}
            </p>
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
          disabled={!formRating || formRating < 1 || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </form>
    </div>
  );
}
