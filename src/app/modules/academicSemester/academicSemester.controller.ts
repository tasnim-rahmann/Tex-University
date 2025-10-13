import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";

const createAcademicSemester = catchAsync(
    async (req, res) => {
        const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic semester created succesfully',
            data: result,
        });
    }
);

const getAllAcademicSemester = catchAsync(
    async (req, res) => {
        const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic semester retrive succesfully',
            data: result,
        });
    }
);

const getSingleAcademicSemester = catchAsync(
    async (req, res) => {
        const { semesterId } = req.params;
        const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Single academic semester retrive succesfully',
            data: result,
        });
    }
);

const updateAcademicSemester = catchAsync(
    async (req, res) => {
        const { semesterId } = req.params;
        const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Update academic semester retrive succesfully',
            data: result,
        });
    }
);

export const AcademicSemesterControllers = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester,
    updateAcademicSemester,
};