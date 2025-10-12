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
            email: z.string().email("Invalid email format"),
            gender: z.enum(["male", "female", "other"]),
            dateOfBirth: z.date().optional(),
            contactNo: z.string().min(1, "Contact number is required"),
            emergencyContactNo: z.string().min(1, "Emergency contact number is required"),
            bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]),
            presentAddress: z.string().min(1, "Present address is required"),
            permanentAddress: z.string().min(1, "Permanent address is required"),
            guardian: guardianValidationSchema,
            localGuardian: localGuardianValidationSchema,
            profileImage: z.string().min(1, "Profile image is required"),
        })
    })
});

export const studentValidations = {
    createStudentValidationSchema,
};