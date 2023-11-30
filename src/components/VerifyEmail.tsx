"use client";

import { trpc } from "@/trpc/client";
import { Icons } from "./ui/icons";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const VerifyEmail = ({ token }: { token: string }) => {
  const router = useRouter();
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  useEffect(() => {
    if (data?.success) {
      router.replace("/iniciar-sesion");
      toast.success("¡Tu cuenta ha sido verificada!");
    }
  }, [data, router]);

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Icons.x className="w-8 h-8 text-red-600" />
        <h3 className="font-semibold text-xl">Ha ocurrido un problema</h3>
        <p className="text-muted-foreground text-sm text-center">
          Este token no es válido o ha expirado. Porfavor intentalo de nuevo
        </p>
      </div>
    );
  }

  if (isLoading || data?.success) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Icons.spinner className="animate-spin h-8 w-8 text-zinc-300" />
        <h3 className="font-semibold text-xl">Verificando cuenta...</h3>
        <p className="text-muted-foreground text-sm">
          No llevará mucho tiempo.
        </p>
      </div>
    );
  }
};
