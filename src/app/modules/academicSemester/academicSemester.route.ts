import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";
const router = express.Router();

router.post(
    '/create-academic-semester',
    validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester
);

export const AcademicSemesterRoutes = router;