import { TAcademicSemester } from "./academicSemester.interface";
import { academicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
    const result = await academicSemester.create(payload);
    return result;
};

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
};