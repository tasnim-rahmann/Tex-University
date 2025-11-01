import { z } from "zod";

const loginValidationSchema = z.object({
    body: z.object({
        id: z.string('ID is required!'),
        password: z.string('Password is required!')
    })
});

const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string('Old password is required!'),
        newPassword: z.string('New password is required!'),
    })
});

export const AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
};