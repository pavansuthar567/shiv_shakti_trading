"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const SignInSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be under 50 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include an uppercase letter, lowercase letter, number, and special character",
    ),
});

const SignInModal = () => {
  const { toast } = useToast();
  const { isSignIn, setIsSignIn, setIsSignUp, setIsSignedIn } = useAuthStore();

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "aa@gmail.com",
      password: "Sadsa@100",
      // email: "",
      // password: "",
    },
  });

  const onSignUpClick = () => {
    setIsSignIn(false);
    setIsSignUp(true);
  };

  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const res = await response.json();

      if (!response.ok) {
        throw new Error(res.error || res.message || "Signin failed");
      }

      const token = res?.data?.data?.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      document.cookie = `token=${token}; path=/; max-age=86400`;

      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      localStorage.setItem("userDetails", JSON.stringify(res?.data?.data));

      toast({ title: res.message || "Signin successful" });
      form.reset();
      setIsSignIn(false);
      setIsSignedIn(true);
    } catch (err) {
      const error =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({ variant: "destructive", title: error });
      console.error("Error signing in:", error);
    }
  };

  return (
    <Dialog.Root open={isSignIn} onOpenChange={setIsSignIn}>
      {/* <Dialog.Trigger asChild>
          <Button>Sign In</Button>
        </Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 !z-10 bg-black/50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 !z-20 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between pb-4">
            <Dialog.Title className="text-xl font-bold">Login</Dialog.Title>
            <Dialog.Close asChild>
              <Button size="icon" variant="ghost">
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign In
              </Button>

              <p className="mt-2 text-center text-sm">
                Don’t have an account?{" "}
                <button
                  onClick={onSignUpClick}
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </button>
              </p>
            </form>
          </Form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default SignInModal;
