import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(1, "Name is required")
            .refine(val => typeof val === "string", "Name must be a string"),

        academicFaculty: z
            .string()
            .min(1, "Academic faculty is required")
            .refine(val => typeof val === "string", "Academic faculty must be a string"),
    }),
});

const updateAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z
            .string()
            .min(1, "Name cannot be empty")
            .refine(val => typeof val === "string", "Name must be a string")
            .optional(),

        academicFaculty: z
            .string()
            .min(1, "Academic faculty cannot be empty")
            .refine(val => typeof val === "string", "Academic faculty must be a string")
            .optional(),
    }),
});

export const AcademicDepartmentValidations = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidation,
};