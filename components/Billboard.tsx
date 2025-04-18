"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import BuyInBulk from "../public/banner/buyinbulk2.png";
// import BuyInBulk from "../public/banner/buyinbulk.webp";
// import Customize from "../public/banner/customize.webp";
// import EcoFriendly from "../public/banner/Eco-Friendly.webp";
import EcoFriendly from "../public/banner/Eco-Friendly1.png";
import Hankies from "../public/banner/Hankies2.png";
import { AspectRatio } from "./ui/aspect-ratio";

export default function Billboard() {
  return (
    <div className="flex-1 py-4">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <AspectRatio ratio={2 / 1}>
              <Image
                className="w-full rounded-lg"
                src={EcoFriendly}
                alt=""
                priority
                width={1920}
                height={960}
              />
            </AspectRatio>
          </CarouselItem>
          <CarouselItem>
            <AspectRatio ratio={2 / 1}>
              <Image
                className="w-full rounded-lg"
                src={Hankies}
                alt="Customize your with your own design and preference."
                width={1920}
                height={960}
                priority
              />
            </AspectRatio>
          </CarouselItem>
          <CarouselItem>
            <AspectRatio ratio={2 / 1}>
              <Image
                className="w-full rounded-lg"
                src={BuyInBulk}
                alt="Customize your with your own design and preference."
                width={1920}
                height={960}
                priority
              />
            </AspectRatio>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
