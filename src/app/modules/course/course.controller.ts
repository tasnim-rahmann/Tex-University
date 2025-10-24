import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(
    async (req, res) => {
        const result = await CourseServices.createCourseIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Course is created succesfully',
            data: result,
        });
    }
);

const getAllCourses = catchAsync(
    async (req, res) => {
        const result = await CourseServices.getAllCoursesFromDB(req.query);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Courses are retrive succesfully',
            data: result,
        });
    }
);

const getSingleCourse = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await CourseServices.getSingleCourseFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Course is retrive succesfully',
            data: result,
        });
    }
);

const deleteCourse = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await CourseServices.deleteCourseFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Course is deleted succesfully',
            data: result,
        });
    }
);

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
};