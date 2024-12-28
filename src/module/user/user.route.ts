import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidations } from '../student/student.validate';
import { FacultyValidations } from '../Faculty/faculty.validate';
import { AdminValidations } from '../Admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(FacultyValidations.createFacultyValidationSchema),
  UserController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);
export const UserRoute = router;
