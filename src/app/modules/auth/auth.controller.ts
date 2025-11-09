import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(
    async (req, res) => {
        const result = await AuthServices.loginUser(req.body);
        const { refreshToken, accessToken, needsPasswordChange } = result;
        res.cookie('refreshToken', refreshToken, {
            secure: config.node_env === 'production',
            httpOnly: true,
            sameSite: 'none',
            maxAge: 1000 * 60 * 60 * 24 * 365,
        });

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User login succesfull!',
            data: {
                accessToken,
                needsPasswordChange,
            },
        });
    }
);

const changePassword = catchAsync(
    async (req, res) => {
        const { ...passwordData } = req.body;
        const result = await AuthServices.changePasswordIntoDB(req.user, passwordData);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Password changed succesfully!',
            data: null,
        });
    }
);

const refreshToken = catchAsync(
    async (req, res) => {
        const { refreshToken } = req.cookies;
        const result = AuthServices.refreshToken(refreshToken);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Here is your new access token!',
            data: result,
        });
    }
);

const forgetPassword = catchAsync(
    async (req, res) => {
        const userId = req.body.id;
        const result = AuthServices.forgetPassword(userId);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Reset link is genarated succesfully!',
            data: result,
        });
    }
);

const resetPassword = catchAsync(
    async (req, res) => {
        const token = req.headers.authorization;
        const result = await AuthServices.resetPassword(req.body, token as string);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Password reset succesfull!',
            data: result,
        });
    }
);

export const AuthControllers = {
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword,
    resetPassword,
};