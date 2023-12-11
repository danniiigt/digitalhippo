"use client";

import { formatCurrency } from "@/lib/utils";
import { Icons } from "./ui/icons";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import { CartItem } from "./CartItem";
import { useEffect, useState } from "react";

const Cart = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { items } = useCart();
  const itemCount = items.length ?? 0;

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );
  const fee = 1;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <Icons.shoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        {isMounted && (
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {itemCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrito de compras</SheetTitle>
        </SheetHeader>

        {isMounted && itemCount > 0 ? (
          <>
            <div className="w-full h-full">
              <ScrollArea>
                <div className="flex flex-col space-y-2">
                  {items.map(({ product }) => (
                    <CartItem product={product} key={product.id} />
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex-auto"></div>
            <div className="space-y-4">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex">
                  <span className="flex-1">Envío</span>
                  <span>Inmediato</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Tarifa de transacción</span>
                  <span>{formatCurrency(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatCurrency(cartTotal + fee)}</span>
                </div>
              </div>
            </div>

            <SheetFooter>
              <SheetTrigger asChild>
                <Button asChild>
                  <Link href="/carrito" className="w-full">
                    Continuar la compra
                  </Link>
                </Button>
              </SheetTrigger>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image src="/hippo-empty-cart.png" alt="Carrito Vacío" fill />
            </div>

            <div className="text-xl font-semibold">Tu carrito está vacío</div>
            <SheetTrigger>
              <Button
                asChild
                variant="link"
                size="sm"
                className="text-sm text-muted-foreground"
              >
                <Link href="/productos">Explorar productos</Link>
              </Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
