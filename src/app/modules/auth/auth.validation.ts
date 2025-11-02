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

const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string('Refresh Token is required!'),
    })
});

const forgetPasswordValidationSchema = z.object({
    body: z.object({
        id: z.string('User id is required!'),
    })
});

export const AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
};