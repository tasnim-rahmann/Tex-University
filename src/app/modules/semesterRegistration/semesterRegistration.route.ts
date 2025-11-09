import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { SemesterRegistrationValidations } from "./semesterRegistration.validation";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
    '/create-semster-registration',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),
    SemesterRegistrationControllers.createSemesterRegistration,
);

router.get(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.student, USER_ROLE.faculty),
    SemesterRegistrationControllers.getAllSemesterRegistrations,
);

router.get(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.student, USER_ROLE.faculty),
    SemesterRegistrationControllers.getSingleSemesterRegistrations,
);

router.patch(
    '/:id',
    auth(USER_ROLE.admin, USER_ROLE.superAdmin),
    validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),
    SemesterRegistrationControllers.updateSemesterRegistration,
);


export const SemesterRegistrationRoutes = router;