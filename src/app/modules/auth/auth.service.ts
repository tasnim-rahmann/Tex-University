import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { createToken } from "./auth.utils";
import { sendEmail } from "../../utils/sendEmail";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByCustomID(payload.id);

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

    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string);

    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user?.needsPasswordChange,
    };
};

const changePasswordIntoDB = async (userData: JwtPayload, payload: { oldPassword: string, newPassword: string; }) => {
    const user = await User.isUserExistsByCustomID(userData.userId);

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

    if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
    }

    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

    await User.findOneAndUpdate({
        id: userData.userId,
        role: userData.role,
    }, {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangedAt: new Date(),
    });

    return null;
};

const refreshToken = async (token: string) => {
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;
    const { userId, iat } = decoded;
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

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };

    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);

    return {
        accessToken,
    };
};

const forgetPassword = async (userId: string) => {
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

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };

    const resetToken = createToken(jwtPayload, config.jwt_access_secret as string, '10m');
    const resetUILink = `http://localhost:5000?id=${user.id}&token=${resetToken}`;

    sendEmail();
};

export const AuthServices = {
    loginUser,
    changePasswordIntoDB,
    refreshToken,
    forgetPassword,
};