import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(
    async (req, res) => {
        const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Offered Course created succesfylly',
            data: result,
        });
    }
);

const updateOfferedCourse = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await OfferedCourseServices.updateOfferedCourseIntoDB(id, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Offered Course updated succesfully',
            data: result,
        });
    }
);

export const OfferedCourseControllers = {
    createOfferedCourse,
    updateOfferedCourse,
};