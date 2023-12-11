import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import React from "react";

const GraciasPage = () => {
  return (
    // <MaxWidthWrapper className="py-6">
    <div className="relative lg:min-h-full">
      <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          src="/checkout-thank-you.jpg"
          className="h-full w-full object-cover object-center"
          alt="Gracias por tu compra"
          fill
        />
      </div>
    </div>
    // </MaxWidthWrapper>
  );
};

export default GraciasPage;
