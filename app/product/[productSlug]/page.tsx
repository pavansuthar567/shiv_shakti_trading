import ProductDetailCard from "@/components/product/ProductDetailCard";
import ProductsMarqueeWrapper from "@/components/product/ProductsMarqueeWrapper";
import { Product } from "@/lib/types";
// import { urlForImage } from "@/sanity/lib/image";
// import { getProductBySlug, getProductsSlug } from "@/sanity/lib/sanity.query";
import type { Metadata } from "next";

export const dynamicParams = false;

type Props = {
  params: { productSlug: string };
};

type ProductSlug = {
  slug: {
    current: string;
  };
};

// export async function generateStaticParams() {
//   const productSlugs = await getProductsSlug();
//   return productSlugs.map((productSlug: ProductSlug) => {
//     return {
//       productSlug: productSlug.slug.current,
//     };
//   });
// }

// export async function generateStaticParams() {
//   let products: [Product] | [] = []; // Initialize product as null

//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
//     );
//     const products = await response.json();
//     console.log("products", products);
//   } catch (error) {
//     products = [];
//     console.error("Error fetching product:", error);
//   }
//   return products.map((product: { id: string }) => {
//     return {
//       productSlug: product.id,
//     };
//   });
// }

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // const product: Product = await getProductBySlug(params.productSlug);

//   console.log("params.productSlug", params.productSlug);

//   return {
//     title: "product.name",
//     alternates: {
//       canonical: `/product/${params.productSlug}`,
//     },
//     description: "product.features",
//   };
// }

const ProductPage = async ({ params }: Props) => {
  const { productSlug } = params;
  console.log("productSlug", productSlug);
  // let product: Product = await getProductBySlug(productSlug);

  let product: Product | null = null; // Initialize product as null

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productSlug}`,
      { cache: "no-store" },
    );

    // if (!response.ok) {
    //   throw new Error("Failed to fetch product");
    // }

    const productItem = await response.json();
    product = product || productItem;
    // const product: Product = await getProductBySlug(productSlug);
  } catch (error) {
    console.error("Error fetching product:", error);
    // Handle error appropriately, e.g., set product to null or show a message
  }

  const jsonLd = {
    // "@context": "https://www.oxabags.com/",
    "@context": "https://shiv-shakti.netlify.app/",
    "@type": "Product",
    name: product?.name || "Product not found", // Fallback if product is null
    // image: urlForImage(product?.images[0]),
    image: product?.image,
    description: product?.features || "No description available", // Fallback if product is null
    brand: {
      "@type": "Brand",
      name: "oxabags",
    },
  };

  return (
    <div className="px-2">
      {product ? (
        <ProductDetailCard product={product} />
      ) : (
        <p>Product not found</p>
      )}
      <ProductsMarqueeWrapper />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default ProductPage;
