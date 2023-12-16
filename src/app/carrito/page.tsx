"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/use-cart";
import { cn, formatCurrency } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Cart = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const router = useRouter();
  const { items, removeItem } = useCart();
  const isEmptyCart = items.length === 0;
  const fee = 1;

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router?.push(url);
      },
    });

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const productIds = items.map(({ product }) => product.id);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {/* <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8"> */}
      {/* </div> */}
      <MaxWidthWrapper className="py-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Carrito de compra
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed border-zinc-200 p-12":
                isMounted && isEmptyCart,
            })}
          >
            <h2 className="sr-only">Items en tu carrito de compra</h2>

            {isMounted && isEmptyCart && (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image
                    src="/hippo-empty-cart.png"
                    loading="eager"
                    fill
                    alt="carrito vacio"
                  />
                </div>

                <h3 className="font-semibold text-2xl">
                  Tu carrito esta vacío
                </h3>
                <p className="text-muted-foreground text-center">
                  Whoops! Nada que mostrar aqui de momento.
                </p>
              </div>
            )}

            {!isMounted && (
              <div className="space-y-4">
                <Skeleton className="h-32 w-full"></Skeleton>
                <Skeleton className="h-32 w-full"></Skeleton>
                <Skeleton className="h-32 w-full"></Skeleton>
                <Skeleton className="h-32 w-full"></Skeleton>
                <Skeleton className="h-32 w-full"></Skeleton>
              </div>
            )}

            <ul
              className={cn({
                "divide-y divide-gray-200 border-y border-gray-200":
                  isMounted && !isEmptyCart,
              })}
            >
              {isMounted &&
                items.map(({ product }) => {
                  const label = PRODUCT_CATEGORIES.find(
                    (c) => c.value === product.category
                  )?.label;
                  const { image } = product.images[0];

                  return (
                    <li key={product.id} className="flex py-6 sm:py-8">
                      <div className="flex-shrink-0">
                        <div className="relative h-32 w-32">
                          {typeof image !== "string" && image.url && (
                            <Image
                              src={image.url}
                              alt={product.name!}
                              fill
                              className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                            />
                          )}
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`/productos/${product.id}`}
                                  className="font-medium text-gray-600 hover:text-gray-900"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>

                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                Categoría: {label}
                              </p>
                            </div>

                            <p className="mt-1 text-sm font-medium text-gray-900">
                              {formatCurrency(product.price)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="Eliminar producto"
                                onClick={() => removeItem(product.id)}
                                variant="ghost"
                              >
                                <Icons.x
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-x-4">
                          <p className="flex items-center space-x-2 text-sm text-gray-700">
                            <Icons.packageCheck className="h-4 w-4 flex-shrink-0 text-green-500" />
                            <span>Entrega inmediata</span>
                          </p>

                          <p className="flex items-center space-x-2 text-sm text-gray-700">
                            <Icons.shieldCheck className="h-4 w-4 flex-shrink-0 text-green-500" />
                            <span>Garantía comprador</span>
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">
              Sumario de pedido
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  {isMounted && formatCurrency(cartTotal)}
                  {!isMounted && (
                    <Icons.spinner className="w-4 h-4 text-muted-foreground animate-spin" />
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Tarifa de transacción
                </span>
                <div className="text-sm font-medium text-gray-900">
                  {isMounted && formatCurrency(fee)}
                  {!isMounted && (
                    <Icons.spinner className="w-4 h-4 text-muted-foreground animate-spin" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">Total</div>
                <div className="text-base font-medium text-gray-900">
                  {isMounted && formatCurrency(cartTotal + fee)}
                  {!isMounted && (
                    <Icons.spinner className="w-4 h-4 text-muted-foreground animate-spin" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full"
                disabled={isLoading || (isMounted && isEmptyCart)}
                onClick={() =>
                  createCheckoutSession({
                    productIds,
                  })
                }
              >
                {!isMounted ||
                  (isLoading && (
                    <Icons.spinner className="w-4 h-4 text-background animate-spin" />
                  ))}
                {isMounted && !isLoading && "Continuar"}
              </Button>
            </div>
          </section>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Cart;
