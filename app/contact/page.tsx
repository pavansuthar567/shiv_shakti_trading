import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function Contact() {
  // const companyName = "Aman Enterprises";
  // const ownerName = "Kuldeep Gupta";
  // const address =
  // "G-211, UPSIDC Industrial Area Phase-1 M. G. Road, Dholana GHAZIABAD -201015, UP";
  // const phoneNumber = "9868151526, 9811365888";
  // const email = "info@oxabags.com";

  const companyName = "Shiv Shakti Trading";
  const ownerName = "Hiralal Suthar";
  const address =
    "266, Sun City Row House, Dindoli-Kharwasa Road, Near Raj Mahal Mall, Dindoli, Surat - 394210, GJ";
  const phoneNumber = "9426862586, 9898032613";
  const email = "pavan.suthar567@gmail.com";

  return (
    <section className="px-2 py-4">
      <h2 className="p-4 text-3xl font-medium">Contact Us</h2>
      <div className="ml-5 flex flex-row items-center space-x-8">
        <div className="flex flex-col gap-8 text-base font-medium md:text-lg">
          <div className="flex flex-col gap-1">
            <p>Company Name:</p>
            <span className="font-normal">{companyName}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p>Owner Name:</p>
            <span className="font-normal">{ownerName}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p>Address:</p>
            <span className="font-normal">{address}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p>Phone Number:</p>
            <span className="font-normal">{phoneNumber}</span>
          </div>
          <div className="flex flex-col gap-1">
            <p>Email:</p>
            <span className="font-normal">{email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
