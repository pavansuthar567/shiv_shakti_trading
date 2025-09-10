"use client";

import { fhelper } from "@/_helpers";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
// import { getProductSlugByID } from "@/sanity/lib/sanity.query";
import { useLocalStorage } from "@/lib/hooks/useIsMounted";
import { useAuthStore } from "@/store/useAuthStore";
import { useOrderStore } from "@/store/useOrderStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  productCode: z.coerce.number({
    invalid_type_error: "Invalid ID",
  }),
});

type UserDetails = {
  token?: string;
  user?: {
    name?: string;
    email?: string;
  };
} | null;

export default function SearchInput() {
  const router = useRouter();
  const { toast } = useToast();

  const { setOrders } = useOrderStore();
  const { setIsSignedIn, setIsSignOut, setIsSignIn, setIsSignUp } =
    useAuthStore();

  const [userDetails, setUserDetails, mounted] = useLocalStorage<UserDetails>(
    "userDetails",
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!mounted) return; // Don't run during SSR or initial render

    const isUserLoggedIn = fhelper.isUserLoggedIn();
    setIsSignedIn(isUserLoggedIn);

    if (userDetails) {
      const token = userDetails?.token;
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  }, [setIsSignedIn, userDetails, mounted]);

  useEffect(() => {
    if (!mounted) return; // Don't run during SSR or initial render

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("error.response?.status", error.response?.status);
        if (error.response?.status === 401) {
          // localStorage.setItem("isLoggedIn", "false");
          // localStorage.removeItem("userDetails");
          setUserDetails(null);
          setIsSignOut(false);
          setIsSignIn(false);
          setIsSignUp(false);
          setIsSignedIn(false);
          // clearCart();
          setOrders([]);
          toast({ title: "Signed out successfully" });
        }
        return Promise.reject(error);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const id: number = Number(values.productCode);
    try {
      // Temporarily disabled Sanity query
      // const productSlug = await getProductSlugByID(id);
      // router.push(`/product/${productSlug.slug.current}`);

      // Mock response for now
      toast({
        title: "Search temporarily disabled",
        description: "Product search will be available soon",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Invalid Product Code",
      });
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="productCode"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <div className="relative flex flex-row">
                  <Input
                    placeholder="Search by Code"
                    {...field}
                    disabled={form.formState.isSubmitting}
                  />
                  <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="absolute right-1 h-10 w-10 scale-75 border border-0 border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground"
                  >
                    <SearchIcon size={15} />
                    <span className="sr-only">search</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage className="absolute -bottom-6" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
