"use client";

import { trpc } from "@/trpc/client";
import { Icons } from "./ui/icons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PaymentStatusProps {
  orderEmail: string;
  orderId: string;
  isPaid: boolean;
}

export const PaymentStatus = ({
  orderEmail,
  orderId,
  isPaid,
}: PaymentStatusProps) => {
  const router = useRouter();
  const { data } = trpc.payment.pollOrderStatus.useQuery(
    {
      orderId,
    },
    {
      enabled: isPaid === false,
      refetchInterval: (data) => (data?.isPaid ? false : 1000),
    }
  );

  useEffect(() => {
    if (data?.isPaid) router.refresh();
  }, [data, router]);

  return (
    <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
      <div>
        <p className="font-medium text-gray-900">Envíado a</p>
        <p>{orderEmail}</p>
      </div>

      <div>
        <p className="font-medium text-gray-900">Estatus</p>
        {isPaid ? (
          <div className="flex items-center text-primary gap-x-2">
            <p>Pagado</p>
            <Icons.check className="w-4 h-4" />
          </div>
        ) : (
          <div className="flex items-center text-orange-500 gap-x-2">
            <p>Pendiente</p>
            <Icons.clock className="w-4 h-4" />
            {/* <Icons.spinner className="w-4 h-4 animate-spin text-gray-600" /> */}
          </div>
        )}
      </div>
    </div>
  );
};
