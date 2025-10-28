import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationService } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(
    async (req, res) => {
        const result = await SemesterRegistrationService.createSemesterRegistrationIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semester Registration is created succesfully',
            data: result,
        });
    }
);

const getAllSemesterRegistrations = catchAsync(
    async (req, res) => {
        const result = await SemesterRegistrationService.getAllSemesterRegistrationsFromDB(req.query);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semster Registrations are retrive succesfully',
            data: result,
        });
    }
);

const getSingleSemesterRegistrations = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await SemesterRegistrationService.getSingleSemesterRegistrationsFromDB(id);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semster Registration is retrive succesfully',
            data: result,
        });
    }
);

const updateSemesterRegistration = catchAsync(
    async (req, res) => {
        const { id } = req.params;
        const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Semster Registration is updated succesfully',
            data: result,
        });
    }
);

export const SemesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistrations,
    updateSemesterRegistration,
};