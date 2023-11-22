import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
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
