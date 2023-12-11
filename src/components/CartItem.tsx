import { Product } from "@/payload-types";
import { Icons } from "./ui/icons";
import Image from "next/image";
import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";

export const CartItem = ({ product }: { product: Product }) => {
  const { removeItem } = useCart();
  const { image } = product.images[0];
  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product?.category
  )?.label;

  return (
    <div className="space-y-3 py-2 pt-4 first:pt-2 first:border-t-0 border-t border-t-gray-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            {typeof image !== "string" && image.url ? (
              <Image
                src={image.url}
                alt={product.name!}
                className="absolute object-cover"
                fill
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <Icons.imageIcon
                  aria-hidden="true"
                  className="h-4 w-4 text-muted-foreground"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium flex-wrap">
              {product.name}
            </span>
            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {label}
            </span>

            <div className="mt-1 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(product.id)}
                className="flex items-center text-xs mt-1"
              >
                <Icons.x className="w-3.5 h-3.5 mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatCurrency(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};
