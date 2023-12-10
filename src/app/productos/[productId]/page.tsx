import AddToCartButton from "@/components/AddToCartButton";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { Icons } from "@/components/ui/icons";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/lib/get-payload";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params: { productId } }: PageProps) => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
    },
  });

  const [product] = docs;

  const validUrls = product?.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product?.category
  )?.label;

  const breadcrumbs = [
    {
      id: 1,
      name: "Inicio",
      href: "/",
    },
    {
      id: 2,
      name: "Productos",
      href: "/productos",
    },
    {
      id: 3,
      name: product.name,
      href: `/productos/${product.id}`,
    },
  ];

  return (
    <MaxWidthWrapper>
      <div className="px-4 md:px-0 py-8">
        {/* Breadcrumbs */}
        <ol className="flex items-center space-x-2 mb-6">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href}>
              <div className="flex items-center text-sm">
                <Link
                  href={breadcrumb.href}
                  className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                >
                  {breadcrumb.name}
                </Link>
                {index !== breadcrumbs.length - 1 && (
                  <Icons.slash className="w-4 h-4 ml-2" strokeWidth={1} />
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Product Images and Description */}
        <main className="flex flex-col md:flex-row gap-x-8">
          <section className="md:w-3/5">
            <div className="aspect-square rounded-lg w-full h-full">
              <ImageSlider urls={validUrls} />
            </div>
          </section>

          <section className="w-full md:w-2/5">
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <p>{formatCurrency(product.price)}</p>
                <Separator className="h-5 mx-3" orientation="vertical" />
                <div className="text-muted-foreground">{label}</div>
              </div>

              <AddToCartButton />

              <Separator className="my-6" />

              <div className="space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="my-8 flex flex-wrap items-center gap-3">
                <div className="flex items-center">
                  <Icons.packageCheck
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-green-500 mr-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Entrega instantanea
                  </p>
                </div>

                <Separator orientation="vertical" className="h-5" />

                <div className="flex items-center">
                  <Icons.check
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-green-500 mr-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    Garantía de devolución
                  </p>
                </div>

                <Separator orientation="vertical" className="h-5 md:h-0" />

                <div className="flex items-center">
                  <Icons.helpCircle
                    aria-hidden="true"
                    className="h-5 w-5 flex-shrink-0 text-green-500 mr-2"
                  />
                  <p className="text-sm text-muted-foreground">Soporte 24/7</p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <div className="mt-4">
          <ProductReel
            title="Otros productos que te puedan interesar..."
            query={{
              category: product.category,
              limit: 4,
            }}
          />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
