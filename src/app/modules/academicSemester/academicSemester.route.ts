import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
    '/create-academic-semester',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester
);

router.get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.student, USER_ROLE.faculty),
    AcademicSemesterControllers.getAllAcademicSemester
);

router.get(
    '/:semesterId',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.student, USER_ROLE.faculty),
    AcademicSemesterControllers.getSingleAcademicSemester
);

router.patch(
    '/:semesterId',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),
    AcademicSemesterControllers.updateAcademicSemester,
);

export const AcademicSemesterRoutes = router;