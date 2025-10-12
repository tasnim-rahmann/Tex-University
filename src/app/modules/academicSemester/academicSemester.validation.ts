import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";
import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as TAcademicSemesterName[]),
        year: z.string(),
        code: z.enum([...AcademicSemesterCode] as TAcademicSemesterCode[]),
        startMonth: z.enum([...Months] as TMonths[]),
        endMonth: z.enum([...Months] as TMonths[]),
    })
});


export const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
};