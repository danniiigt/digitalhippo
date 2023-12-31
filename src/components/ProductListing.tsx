"use client";

import { Product } from "@/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import ImageSlider from "./ImageSlider";

interface ProductListingProps {
  product: Product | null;
  index: number;
}

const ProductListing = ({ product, index }: ProductListingProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const label = PRODUCT_CATEGORIES.find(
    (category) => category.value === product?.category
  )?.label;

  const validUrls = product?.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 75);

    return () => clearTimeout(timer);
  }, [index]);

  if (!product || !isVisible) return <ProductPlaceholder />;

  if (isVisible && product) {
    return (
      <Link
        className={cn("invisible h-full w-full cursor-pointer group/main", {
          "visible animate-in fade-in-5": isVisible,
        })}
        href={`/productos/${product.id}`}
      >
        <div className="flex flex-col w-full">
          <ImageSlider urls={validUrls} allowZoom />

          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{label}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>
    );
  }
};

const ProductPlaceholder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-200 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="w-full h-full" />
      </div>

      <Skeleton className="bg-zinc-200 mt-4 w-2/3 h-3 rounded-lg" />
      <Skeleton className="bg-zinc-200 mt-2 w-16 h-1.5 rounded-lg" />
      <Skeleton className="bg-zinc-200 mt-2 w-12 h-1.5 rounded-lg" />
    </div>
  );
};

export default ProductListing;
