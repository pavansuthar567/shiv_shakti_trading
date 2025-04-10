// import { getFeaturedProducts } from "@/sanity/lib/sanity.query";
import { Suspense } from "react";
import ProductsMarquee from "./ProductsMarquee";

export default async function ProductsMarqueeWrapper() {
  // const products = await getFeaturedProducts();

  let products: any = [];
  let error: string | null = null;

  try {
    // products = await getProductsByCategory(categoryId);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      { cache: "no-store" },
    );

    // if (!response.ok) {
    //   throw new Error("Failed to fetch product categories");
    // }

    products = await response.json();
    console.log("products?.length", products?.length);
  } catch (err) {
    error = err instanceof Error ? err.message : "An unknown error occurred";
    console.error("Error fetching categories:", error);
  }

  return (
    <section className="py-4 md:py-10">
      <h2 className="p-2 pt-0 text-lg font-medium md:p-4 md:pt-0 md:text-xl">
        Our Most Popular Products
      </h2>
      {error ? (
        <p>Error loading products: {error}</p>
      ) : (
        <Suspense fallback={<p>Loading...</p>}>
          <ProductsMarquee products={products} />
        </Suspense>
      )}
    </section>
  );
}

// "use client";
// import { useEffect, useState } from "react";
// import ProductsMarquee from "./ProductsMarquee";

// export default function ProductsMarqueeWrapper() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
//           { cache: "no-store" },
//         );
//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         setError(
//           err instanceof Error ? err.message : "An unknown error occurred",
//         );
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <section className="py-4 md:py-10">
//       <h2 className="p-2 pt-0 text-lg font-medium md:p-4 md:pt-0 md:text-xl">
//         Our Most Popular Products
//       </h2>
//       {error ? (
//         <p>Error loading products: {error}</p>
//       ) : (
//         <ProductsMarquee products={products} />
//       )}
//     </section>
//   );
// }
