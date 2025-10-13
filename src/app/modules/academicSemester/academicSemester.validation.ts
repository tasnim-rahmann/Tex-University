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

const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as TAcademicSemesterName[]).optional(),
        year: z.string().optional(),
        code: z.enum([...AcademicSemesterCode] as TAcademicSemesterCode[]).optional(),
        startMonth: z.enum([...Months] as TMonths[]).optional(),
        endMonth: z.enum([...Months] as TMonths[]).optional(),
    })
});


export const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
};