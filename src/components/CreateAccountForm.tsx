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
import { useRouter } from "next/navigation";

const CreateAccountForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate } = trpc.auth.createUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        toast.error("Ya existe una cuenta con este correo electrónico");
      } else {
        toast.error("Ha ocurrido un error al crear tu cuenta");
      }
    },

    onSuccess: ({ sentToEmail }) => {
      router.push(`/verificar-email?to=${sentToEmail}`);
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({
      email,
      password,
    });
  };

  return (
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

        <Button>Crear cuenta</Button>
      </div>
    </form>
  );
};

export default CreateAccountForm;
