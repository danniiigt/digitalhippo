import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z
    .string()
    .min(1, {
      message: "El email no puede estar vacío",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z
    .string()
    .min(6, {
      message: "La contraseña debe tener entre 6 y 24 caracteres",
    })
    .max(24, {
      message: "La contraseña debe tener entre 6 y 24 caracteres",
    }),
});

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
