// import { getCategories } from "@/sanity/lib/sanity.query";
import Link from "next/link";
import CartSheet from "./cart/CartSheet";
import MenuSheet from "./MenuSheet";
import Navbar from "./Navbar";
import SearchInput from "./SearchInput";
import ClientOnly from "./ui/client-only";

export default async function Header() {
  let categories: any = [];
  let productCategoryList = [];
  let error: string | null = null;

  try {
    // categories = await getCategories();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/product-categories`,
    );

    // if (!response.ok) {
    //   throw new Error("Failed to fetch product categories");
    // }

    productCategoryList = await response.json();
    categories = [...categories, ...productCategoryList];
  } catch (err) {
    error = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Error fetching categories:", error);
  }

  return (
    <header className="sticky top-0 z-10 mx-auto w-full max-w-7xl border-b border-border/40 bg-background/95 px-2 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/90 md:px-10">
      <nav className="flex flex-row items-center gap-6">
        <MenuSheet categories={categories} />
        <Link className="mx-auto md:mx-0" href="/">
          {/* <h1 className="text-2xl font-bold italic">oxabags</h1> */}
          <h1 className="text-2xl font-bold italic">ShivX</h1>
        </Link>
        <Navbar categories={categories} />
        <div className="ml-0 flex flex-row gap-2 md:ml-auto">
          <div suppressHydrationWarning className="hidden md:block">
            <ClientOnly
              fallback={
                <div className="relative flex flex-row">
                  <input
                    placeholder="Search by Code"
                    disabled={true}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <button
                    disabled={true}
                    type="submit"
                    className="absolute right-1 h-10 w-10 scale-75 border border-0 border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground"
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <span className="sr-only">search</span>
                  </button>
                </div>
              }
            >
              <SearchInput />
            </ClientOnly>
          </div>
          <ClientOnly
            fallback={
              <div className="flex items-center">
                <button className="relative inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" x2="21" y1="6" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                  <span className="sr-only">Cart</span>
                </button>
              </div>
            }
          >
            <CartSheet />
          </ClientOnly>
        </div>
      </nav>
    </header>
  );
}
