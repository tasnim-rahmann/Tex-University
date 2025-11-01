import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
    '/:id',
    auth(USER_ROLE.admin),
    validateRequest(updateFacultyValidationSchema),
    FacultyControllers.updateFaculty,
);

router.delete('/:id', auth(USER_ROLE.admin), FacultyControllers.deleteFaculty);

router.get('/', auth(), FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;