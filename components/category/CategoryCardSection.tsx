import CategoryCard from "@/components/category/CategoryCard";
import AnkleSocks from "@/public/categoryImages/ankle socks.jpg";
import NoShowSocks from "@/public/categoryImages/no show socks.jpg";
import CrewSocks from "@/public/categoryImages/crew socks6.jpg";
import ThermalSocks from "@/public/categoryImages/thermal socks.jpg";
import CottonHankies from "@/public/categoryImages/cotton hankies.jpg";
import LadiesHankies from "@/public/categoryImages/ladies hankies.jpg";
// import CanvasBag from "@/public/categoryImages/canvas bags.webp";
// import CottonBag from "@/public/categoryImages/cotton bag.webp";
// import DenimBag from "@/public/categoryImages/denim bags.webp";
// import FileFolder from "@/public/categoryImages/file folder.webp";
// import JuteBag from "@/public/categoryImages/JUTE BAGS.webp";
// import Pouch from "@/public/categoryImages/pouch.webp";

export default function CategoryCardSection() {
  return (
    <section className="py-4 md:py-10">
      <div className="grid grid-cols-1 justify-end gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
        <CategoryCard
          title="No-Show Socks"
          description="Stay Hidden, Stay Comfortable with Our No-Show Socks."
          image={NoShowSocks}
          link="/category/cotton-bags"
        />
        <CategoryCard
          title="Ankle Socks"
          description="Breathe Easy with Our Lightweight Ankle Socks."
          image={AnkleSocks}
          link="/category/cotton-bags"
        />
        <CategoryCard
          title="Crew Socks"
          description="Classic Fit, Ultimate Comfort - Stay Cozy All Day with Our Versatile Crew Socks."
          image={CrewSocks}
          link="/category/cotton-bags"
        />
        <CategoryCard
          title="Thermal Socks"
          description="Warmth and Comfort for the Coldest Days."
          image={ThermalSocks}
          link="/category/cotton-bags"
        />
        <CategoryCard
          title="Cotton Hankies"
          description="Soft, Durable, and Always Reliable."
          image={CottonHankies}
          link="/category/cotton-bags"
        />
        <CategoryCard
          title="Ladies Hankies"
          description="Refined and Beautiful, Just Like You."
          image={LadiesHankies}
          link="/category/cotton-bags"
        />
        {/* <CategoryCard
          title="Cotton Bags"
          description="Ethically sourced and made from 100% organic cotton."
          image={CottonBag}
          link="/category/cotton-bags"
        />
        <CategoryCard
          title="Canvas Bags"
          description="Trendy and stylish designs printed on high quality canvas."
          image={CanvasBag}
          link="/category/canvas-bags"
        />
        <CategoryCard
          title="Pouches"
          description="Pouches for your everyday needs."
          image={Pouch}
          link="/category/pouches"
        />

        <CategoryCard
          title="File Folders"
          description="Keep your documents safe and organized."
          image={FileFolder}
          link="/category/file-folders"
        />

        <CategoryCard
          title="Jute Bags"
          description="Eco-friendly bags made from jute."
          image={JuteBag}
          link="/category/jute-bags"
        />

        <CategoryCard
          title="Denim Bags"
          description="Trendy and stylish designs printed on high quality denim."
          image={DenimBag}
          link="/category/denim-bags"
        /> */}
      </div>
    </section>
  );
}
