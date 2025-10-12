import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body;
        // const zodParsedData = studentValidationSchema.parse(studentData);
        const result = await UserServices.createStudentIntoDB(password, studentData);

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

export const UserControllers = { createStudent };