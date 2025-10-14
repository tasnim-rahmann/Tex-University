import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(
    async (req, res) => {
        const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic department is created succesfully',
            data: result,
        });
    }
);

const getAllAcademicDepartments = catchAsync(
    async (req, res) => {
        const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'All academic departments are retrive succesfully',
            data: result,
        });
    }
);

const getSingleAcademicDepartment = catchAsync(
    async (req, res) => {
        const { departmentId } = req.params;
        const result = await AcademicDepartmentServices.getSingleAcademicDepartmentsFromDB(departmentId);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Academic department is retrive succesfully',
            data: result,
        });
    }
);

const updateAcademicDepartment = catchAsync(
    async (req, res) => {
        const { departmentId } = req.params;
        const result = await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId, req.body);

        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: '=Academic department is updated succesfully',
            data: result,
        });
    }
);

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment,
};