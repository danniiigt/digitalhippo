"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsValidator = void 0;
var zod_1 = require("zod");
exports.AuthCredentialsValidator = zod_1.z.object({
    email: zod_1.z
        .string()
        .min(1, {
        message: "El email no puede estar vacío",
    })
        .email({
        message: "El email no es válido",
    }),
    password: zod_1.z
        .string()
        .min(6, {
        message: "La contraseña debe tener entre 6 y 24 caracteres",
    })
        .max(24, {
        message: "La contraseña debe tener entre 6 y 24 caracteres",
    }),
});
