import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
            }

            const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
            const { role, userId, iat } = decoded;
            const user = await User.isUserExistsByCustomID(userId);

            if (!user) {
                throw new AppError(httpStatus.NOT_FOUND, 'This is user is not found!');
            }

            const isDeleted = user?.isDeleted;
            if (isDeleted) {
                throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted!');
            }

            const userStatus = user?.status;
            if (userStatus === 'blocked') {
                throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!');
            }

            if (user.passwordChangedAt && User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)) {
                throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(httpStatus.FORBIDDEN, 'Your are not authorized!');
            }

            req.user = decoded as JwtPayload;
            next();
        }
    );
};

export default auth;