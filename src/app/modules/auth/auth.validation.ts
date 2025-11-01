import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        id: z.string('ID is required!'),
        password: z.string('Password is required!')
    })
});

export const AuthValidation = {
    loginValidationSchema,
};