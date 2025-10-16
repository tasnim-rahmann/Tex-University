import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().min(1, "Last name is required"),
});

const guardianValidationSchema = z.object({
    fatherName: z.string().min(1, "Father name is required"),
    fatherOccupation: z.string().min(1, "Father occupation is required"),
    fatherContactNo: z.string().min(1, "Father contact number is required"),
    motherName: z.string().min(1, "Mother name is required"),
    motherOccupation: z.string().min(1, "Mother occupation is required"),
    motherContactNo: z.string().min(1, "Mother contact number is required"),
});

const localGuardianValidationSchema = z.object({
    name: z.string().min(1, "Local guardian name is required"),
    occupation: z.string().min(1, "Local guardian occupation is required"),
    contactNo: z.string().min(1, "Local guardian contact number is required"),
    address: z.string().min(1, "Local guardian address is required"),
});

const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().max(20),
        student: z.object({
            name: userNameValidationSchema,
            email: z.string().email(),
            gender: z.enum(["male", "female", "other"]),
            dateOfBirth: z.string().optional(),
            contactNo: z.string().min(1, "Contact number is required"),
            emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
            bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]),
            presentAddress: z.string().min(1, "Present address is required"),
            permanentAddress: z.string().min(1, "Permanent address is required"),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            admissionSemester: z.string(),
            academicDepartment: z.string(),
            profileImage: z.string().min(1, "Profile image is required"),
        })
    })
});

const updateUserNameValidationSchema = z.object({
    firstName: z.string().trim().optional(),
    middleName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
});

const updateGuardianValidationSchema = z.object({
    fatherName: z.string().optional(),
    fatherOccupation: z.string().optional(),
    fatherContactNo: z.string().optional(),
    motherName: z.string().optional(),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
    name: z.string().optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
});

const updateStudentValidationSchema = z.object({
    body: z.object({
        student: z.object({
            name: updateUserNameValidationSchema.optional(),
            email: z.string().email().optional(),
            gender: z.enum(["male", "female", "other"]).optional(),
            dateOfBirth: z.string().optional(),
            contactNo: z.string().optional(),
            emergencyContactNo: z.string().optional(),
            bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]).optional(),
            presentAddress: z.string().optional(),
            permanentAddress: z.string().optional(),
            guardian: updateGuardianValidationSchema.optional(),
            localGuardian: updateLocalGuardianValidationSchema.optional(),
            admissionSemester: z.string().optional(),
            academicDepartment: z.string().optional(),
            profileImage: z.string().optional(),
        }),
    }),
});


export const studentValidations = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};