"use client";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const SignInForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const onChangeRole = () => {
    if (isSeller) {
      router.push("?as=client");
    } else {
      router.push("?as=seller");
    }
  };

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        setError("email", {
          message: "Email o contraseña incorrectos",
        });
      } else {
        toast.error(
          "Ha ocurrido un error al iniciar sesión. Intentalo de nuevo más tarde."
        );
      }
    },

    onSuccess: () => {
      if (origin) {
        router.push(origin);
        router.refresh();
        return;
      }
      if (isSeller) {
        router.push("/sell");
        router.refresh();
        return;
      }

      router.push("/");
      router.refresh();
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({
      email,
      password,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1 py-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              type="email"
              className={cn("bg-gray-100", {
                "focus-visible:ring-red-500": errors.email,
              })}
              placeholder="Tu correo electrónico"
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-1 py-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              {...register("password")}
              type="password"
              className={cn("bg-gray-100", {
                "focus-visible:ring-red-500": errors.email,
              })}
              placeholder="Tu contraseña"
            />
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button isLoading={isLoading} disabled={isLoading}>
            {isSeller ? "Acceder (VENDEDOR)" : "Acceder"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>

        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">o</span>
        </div>
      </div>

      {isSeller ? (
        <Button
          onClick={onChangeRole}
          variant="secondary"
          className="text-gray-500"
          isLoading={isLoading}
          disabled={isLoading}
        >
          Continúa como cliente
        </Button>
      ) : (
        <Button
          onClick={onChangeRole}
          variant="secondary"
          className="text-gray-500"
          disabled={isLoading}
        >
          Continúa como vendedor
        </Button>
      )}
    </>
  );
};

export default SignInForm;
