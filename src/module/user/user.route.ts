import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidations } from '../student/student.validate';
import { FacultyValidations } from '../Faculty/faculty.validate';

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

export const UserRoute = router;
