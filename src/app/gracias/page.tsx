import { getPayloadClient } from "@/lib/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { Product, ProductFile } from "@/payload-types";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatCurrency } from "@/lib/utils";
import { PaymentStatus } from "@/components/PaymentStatus";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const GraciasPage = async ({ searchParams }: PageProps) => {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();
  const payload = await getPayloadClient();

  const { user } = await getServerSideUser(nextCookies);
  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  const products = order.products as Product[];
  const orderTotal = products.reduce((total, { price }) => total + price, 0);
  const fee = 1;

  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (!order) return notFound();

  if (orderUserId !== user?.id)
    return redirect(`/iniciar-sesion?origin=gracias?orderId=${orderId}`);

  return (
    <MaxWidthWrapper className="flex relative">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div>
          <p className="text-sm font-medium text-primary">Pedido Confirmado</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            ¡Gracias por tu pedido!
          </h1>

          {order._isPaid ? (
            <p className="mt-4 text-base text-muted-foreground">
              Tu pedido ha sido confirmado y el contenido del producto está
              disponible para descargar. Hemos enviado un email con los detalles
              de tu pedido.
            </p>
          ) : (
            <p className="mt-4 text-base text-muted-foreground">
              Tu pedido está en proceso. Te envíaremos un email cuando tu pedido
              esté confirmado.
            </p>
          )}

          <div className="mt-16 text-sm font-medium">
            <div className="text-muted-foreground">Pedido nº</div>
            <div className="mt-2 text-gray-900">{orderId}</div>
          </div>

          <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
            {(order.products as Product[]).map((product) => {
              const label = PRODUCT_CATEGORIES.find(
                (c) => c.value === product.category
              )?.label;
              const downloadUrl = (product.product_files as ProductFile)
                .url as string;
              const { image } = product.images[0];

              return (
                <li key={product.id} className="flex space-x-6 py-6">
                  <div className="relative h-24 w-24">
                    {typeof image !== "string" && image.url && (
                      <Image
                        src={image.url}
                        alt={`${product.name} image`}
                        fill
                        className="flex-none rounded-md bg-gray-100 object-cover object-center"
                      />
                    )}
                  </div>

                  <div className="flex-auto flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="text-gray-900">{product.name}</h3>
                      <p className="my-1">Categoría: {label}</p>
                    </div>

                    {order._isPaid && (
                      <a
                        href={downloadUrl}
                        download={product.name}
                        className="text-primary hover:underline underline-offset-2"
                      >
                        Descargar
                      </a>
                    )}
                  </div>

                  <p className="flex-none font-medium text-gray-900">
                    {formatCurrency(product.price)}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="space-y-2 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="text-gray-900">{formatCurrency(orderTotal)}</p>
            </div>
            <div className="flex justify-between">
              <p>Tarifa de transacción</p>
              <p className="text-gray-900">{formatCurrency(fee)}</p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-2 text-gray-900">
              <p className="text-base">Total</p>
              <p className="text-base">{formatCurrency(orderTotal + fee)}</p>
            </div>
          </div>

          <PaymentStatus
            orderEmail={user.email}
            orderId={order.id}
            isPaid={order._isPaid}
          />

          <div className="mt-16 border-t border-gray-200 py-6 text-right">
            <Link
              className="text-sm font-medium text-primary hover:text-primary/75"
              href="/products"
            >
              Ver más productos &rarr;
            </Link>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default GraciasPage;
