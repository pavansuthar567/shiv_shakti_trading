"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@/lib/types";
// import { urlForImage } from "@/sanity/lib/image";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";

export default function ProductCarousel({ product }: { product: Product }) {
  return (
    <div className="flex-1 md:w-1/2">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 7000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {(product.image ? [product.image] : product.images || [])?.map(
            (image: any, index: number) => (
              // {[product.images].map((image: any, index: number) => (
              <CarouselItem key={index}>
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src={image}
                    // src={urlForImage(image)}
                    width={1000}
                    height={1000}
                    alt={product.name}
                    className="rounded-lg"
                    priority
                  />
                </AspectRatio>
              </CarouselItem>
            ),
          )}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
}
