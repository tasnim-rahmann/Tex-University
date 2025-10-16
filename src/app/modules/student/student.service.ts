import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";

const getAllStudentFromDB = async () => {
    const result = await Student.find().populate('user').populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        }
    });
    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({ id }).populate('user').populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        }
    });
    return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;
    const modifiedUpdatedData: Record<string, unknown> = { ...remainingStudentData };
    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdatedData[`name.${key}`] = value;
        }
    }
    if (guardian && Object.keys(guardian).length) {
        for (const [key, value] of Object.entries(guardian)) {
            modifiedUpdatedData[`guardian.${key}`] = value;
        }
    }
    if (localGuardian && Object.keys(localGuardian).length) {
        for (const [key, value] of Object.entries(localGuardian)) {
            modifiedUpdatedData[`localGuardian.${key}`] = value;
        }
    }

    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, { new: true, runValidators: true });
    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
        const deletedUser = await User.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student!');
        }
        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user!');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;
    } catch (error) {
        await session.commitTransaction();
        await session.endSession();
        throw new Error('Failed to delete user!');
    }
};

export const StudentServices = {
    getAllStudentFromDB,
    getSingleStudentFromDB,
    updateStudentIntoDB,
    deleteStudentFromDB,
};