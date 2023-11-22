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

const CreateAccountForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const onSubmit = ({}: TAuthCredentialsValidator) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="grid gap-1 py-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            type="email"
            className={cn({
              "focus-visible:ring-red-500": errors.email,
            })}
            placeholder="Tu correo electrónico"
          />
        </div>

        <div className="grid gap-1 py-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            {...register("password")}
            type="password"
            className={cn({
              "focus-visible:ring-red-500": errors.email,
            })}
            placeholder="Tu contraseña"
          />
        </div>

        <Button>Crear cuenta</Button>
      </div>
    </form>
  );
};

export default CreateAccountForm;
