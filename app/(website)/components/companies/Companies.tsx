import SectionHeader from "@/components/common/header/section-header";
import Image from "next/image";
import React from "react";

const Companies = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-24 padding bg-green-100">
      <div className="sm:col-span-1 flex items-center ">
        <SectionHeader
          title="Company That Trusted Us"
          description="Thank you to the brands that trust Basera - your support drives us to deliver excellence every step of the way."
        />
      </div>

      <div className="sm:col-span-2 grid grid-cols-4 gap-4">
        <Image
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Company 1"
          width={200}
          height={200}
        />
        <Image
          src="https://img.freepik.com/free-vector/flat-design-ac-logo-design_23-2149482027.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Company 1"
          width={200}
          height={200}
        />
        <Image
          src="https://img.freepik.com/free-vector/bicycle-shop-logo-design-vector_53876-40626.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Company 1"
          width={200}
          height={200}
        />
        <Image
          src="https://img.freepik.com/free-vector/gradient-quill-pen-logo-with-tagline-template_23-2149813051.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Company 1"
          width={200}
          height={200}
        />
        <Image
          src="https://img.freepik.com/free-vector/gradient-quill-pen-logo-with-tagline-template_23-2149813051.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Company 1"
          width={200}
          height={200}
        />
        <Image
          src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Company 1"
          width={200}
          height={200}
        />
        <Image
          src="https://img.freepik.com/free-vector/flat-design-ac-logo-design_23-2149482027.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Company 1"
          width={200}
          height={200}
        />
        <Image
          src="https://img.freepik.com/free-vector/bicycle-shop-logo-design-vector_53876-40626.jpg?ga=GA1.1.428175351.1750225494&semt=ais_hybrid&w=740"
          alt="Company 1"
          width={200}
          height={200}
        />


      </div>
    </section>
  );
};

export default Companies;
