import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
};

export default function About() {
  return (
    <section className="px-2 py-4">
      <h2 className="p-4 text-3xl font-medium">About Us</h2>
      <ul className="flex list-inside list-disc flex-col gap-2">
        <li>
          Established in June 2024, Shiv Shakti Trading has quickly emerged as a
          trusted wholesaler of socks and hankies while also retailing premium
          hosiery products, including underwear, ladies&apos; t-shirts,
          leggings, and napkins.
        </li>
        <li>
          Located in Dindoli, Surat, we are committed to providing high-quality
          essentials that blend comfort, durability, and affordability.
        </li>
        <li>
          Our diverse product range caters to both wholesale buyers seeking bulk
          quantities and retail customers looking for stylish and comfortable
          hosiery.
        </li>
        <li>
          Quality and customer satisfaction are at the core of our business. We
          ensure every product meets high industry standards, offering the
          perfect balance of style, functionality, and longevity.
        </li>
        <li>
          With a customer-first approach, we strive to build long-term
          relationships, offering flexible ordering options and dedicated
          service for both individual and business clients.
        </li>
        <li>
          We believe in continuous innovation, expanding our product line to
          meet the ever-evolving demands of the market while maintaining
          competitive pricing.
        </li>
        <li>
          As a responsible business, we emphasize ethical practices and strive
          to create a positive impact within our community.
        </li>
        <li>
          Whether you&apos;re a business looking for bulk purchases or an
          individual seeking premium hosiery essentials, Shiv Shakti Trading is
          your reliable partner for quality and comfort.
        </li>
        {/* <li>
          As a proud member of the community, we are committed to sustainability
          and ethical business practices. We strive to minimize our
          environmental footprint and contribute positively to society through
          our operations.
        </li> */}
      </ul>
    </section>
  );
}

// export default function About() {
//   return (
//     <section className="px-2 py-4">
//       <h2 className="p-4 text-3xl font-medium">About Us</h2>
//       <ul className="flex list-inside list-disc flex-col gap-2">
//         <li>
//           Established in 2003, Aman Enterprises has been a cornerstone in the
//           manufacturing and distribution of premium quality bags and pouches.
//         </li>
//         <li>
//           Nestled within the industrious landscape of Uttar Pradesh State
//           Industrial Development Corporation, Ghaziabad, Uttar Pradesh, our
//           journey began with a vision to blend tradition with modernity,
//           offering products that resonate with our customers&apos; diverse
//           needs.
//         </li>
//         <li>
//           At Aman Enterprises, we take pride in our extensive range of
//           offerings, including cotton bags, canvas, jute, denim pouches, and
//           more. Our commitment to quality craftsmanship and attention to detail
//           sets us apart in the industry.
//         </li>
//         <li>
//           Each product is meticulously crafted to meet the highest standards of
//           durability, functionality, and style.
//         </li>
//         <li>
//           With years of experience and expertise, we have cultivated strong
//           relationships with our customers, both individuals and organizations
//           alike.
//         </li>
//         <li>
//           We understand the unique requirements of our clients, which is why we
//           offer the flexibility of bulk orders for organizations seeking
//           high-quality bags and pouches for their various needs.
//         </li>
//         <li>
//           Our dedication to customer satisfaction drives us to continuously
//           innovate and improve our products and services.
//         </li>
//         <li>
//           Whether you&apos;re an individual looking for eco-friendly bags or an
//           organization in need of bulk purchases, Aman Enterprises is your
//           reliable partner every step of the way.
//         </li>
//         <li>
//           As a proud member of the community, we are committed to sustainability
//           and ethical business practices. We strive to minimize our
//           environmental footprint and contribute positively to society through
//           our operations.
//         </li>
//       </ul>
//     </section>
//   );
// }
