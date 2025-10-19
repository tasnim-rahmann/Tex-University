import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constance";

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
    // filtering, searching, sorting, pagination, limiting in functional way
    // {
    //     let searchTerm = "";
    //     const studentSearchableFields = ["email", "name.firstName", "presentAddress"];
    //     const queryObj = { ...query };

    //     if (query?.searchTerm) {
    //         searchTerm = query?.searchTerm as string;
    //     }

    //     const searchQuery = Student.find({
    //         $or: studentSearchableFields.map((field) => ({
    //             [field]: { $regex: searchTerm, $options: "i" },
    //         })),
    //     });

    //     const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    //     excludeFields.forEach(element => delete queryObj[element]);

    //     const filterQuery = searchQuery
    //         .find(queryObj)
    //         .populate("user")
    //         .populate("admissionSemester")
    //         .populate({
    //             path: "academicDepartment",
    //             populate: {
    //                 path: "academicFaculty",
    //             },
    //         });

    //     let sort = '-createdAt';
    //     if (query.sort) {
    //         sort = query.sort as string;
    //     }
    //     const sortQuery = filterQuery.sort(sort);

    //     let page = 1;
    //     let limit = 1;
    //     let skip = 0;
    //     if (query.limit) {
    //         limit = Number(query.limit);
    //     }
    //     if (query.page) {
    //         page = Number(query.page);
    //         skip = (page - 1) * limit;
    //     }

    //     const paginateQuery = sortQuery.skip(skip);
    //     const limitQuery = paginateQuery.limit(limit);

    //     let fields = '-__v';

    //     if (query.fields) {
    //         fields = (query.fields as string).split(',',).join(' ');
    //     }
    //     const fieldQuery = await limitQuery.select(fields);

    //     return fieldQuery;
    // }

    // filtering, searching, sorting, pagination, limiting
    const studentQuery = new QueryBuilder(
        Student.find()
            .populate('admissionSemester')
            .populate({
                path: 'academicDepartment',
                populate: {
                    path: 'academicFaculty',
                }
            }), query)
        .search(studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await studentQuery.modelQuery;
    return result;
};

const getSingleStudentFromDB = async (id: string) => {
    const result = await Student.findOne({ id })
        .populate("user")
        .populate("admissionSemester")
        .populate({
            path: "academicDepartment",
            populate: {
                path: "academicFaculty",
            },
        });
    return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
    const { name, guardian, localGuardian, ...remainingStudentData } = payload;
    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingStudentData,
    };
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

    const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteStudentFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const deletedStudent = await Student.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );
        const deletedUser = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student!");
        }
        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user!");
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedStudent;
    } catch (error) {
        await session.commitTransaction();
        await session.endSession();
        throw new Error("Failed to delete user!");
    }
};

export const StudentServices = {
    getAllStudentFromDB,
    getSingleStudentFromDB,
    updateStudentIntoDB,
    deleteStudentFromDB,
};