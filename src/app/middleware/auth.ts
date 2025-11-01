import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
            }

            jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
                if (err) {
                    throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
                }

                const role = (decoded as JwtPayload).role;
                if (requiredRoles && !requiredRoles.includes(role)) {
                    throw new AppError(httpStatus.FORBIDDEN, 'Your are not authorized!');
                }

                req.user = decoded as JwtPayload;
                next();
            });
        }
    );
};

export default auth;