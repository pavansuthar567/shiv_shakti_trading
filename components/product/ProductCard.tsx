import { Product } from "@/lib/types";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product?.slug?.current || product?._id}`}>
      <Card className="flex h-full w-fit flex-col justify-around">
        <CardHeader className="flex items-center justify-center p-1">
          <Image
            src={product?.images?.[0] || product?.image}
            // src={urlForImage(product.images || product?.image)}
            width={220}
            height={220}
            alt={product.name}
            loading="lazy"
            className="rounded-md object-cover"
          />
        </CardHeader>
        <CardContent className="p-2 pt-0">
          <CardTitle className="line-clamp-2 max-w-[200px] text-sm font-medium leading-tight sm:text-base">
            {product.name}
          </CardTitle>
          <CardDescription className="text-sm">
            {product?.category?.name}
          </CardDescription>
        </CardContent>
        <CardFooter className="w-full p-2 pt-0">
          <p className="font-medium text-primary">₹ {product.price}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}
