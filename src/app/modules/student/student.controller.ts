import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;
        const zodParsedData = studentValidationSchema.parse(studentData);
        const result = await StudentServices.createStudentIntoDB(zodParsedData);

        res.status(200).json({
            success: true,
            message: 'student is created successfully',
            data: result,
        });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error?.message || 'something went wrong',
            error: error,
        });
    }
};

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentFromDB();

        res.status(200).json({
            success: true,
            message: 'student are retrived succesfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
};

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: 'student is retrived succesfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
};

const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);

        res.status(200).json({
            success: true,
            message: 'student deleted succesfully',
            data: result,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: error,
        });
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};