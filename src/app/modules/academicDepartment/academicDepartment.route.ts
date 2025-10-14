import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
const router = express.Router();

router.post(
    '/create-academic-department',
    validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.createAcademicDepartment,
);
router.get(
    '/',
    AcademicDepartmentControllers.getAllAcademicDepartments,
);
router.get(
    '/:departmentId',
    AcademicDepartmentControllers.getSingleAcademicDepartment,
);
router.patch(
    '/:departmentId',
    validateRequest(AcademicDepartmentValidations.updateAcademicDepartmentValidation),
    AcademicDepartmentControllers.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;