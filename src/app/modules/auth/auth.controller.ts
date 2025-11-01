import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(
    async (req, res) => {
        const result = await AuthServices.loginUser(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'User login succesfull!',
            data: result,
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

export const AuthControllers = {
    loginUser,
    changePassword,
};