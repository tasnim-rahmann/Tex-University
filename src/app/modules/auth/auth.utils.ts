import jwt, { SignOptions } from "jsonwebtoken";

export const createToken = (
    jwtPayload: { userId: string, role: string; },
    secret: string,
    expiresIn: string
) => {
    jwt.sign(jwtPayload, secret, { expiresIn: expiresIn } as SignOptions);
};