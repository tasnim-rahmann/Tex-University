import { Request, Response } from "express";
import { StudentServices } from "./student.service";

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
    getAllStudents,
    getSingleStudent,
    deleteStudent,
};