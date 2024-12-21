import express from 'express';
import { StudentController } from './student.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidations } from './student.validate';

const router = express.Router();

// single data
router.get('/:id', StudentController.singleStudent);

// update data
router.patch(
  '/:id',
  validateRequest(studentValidations.updateStudentValidationSchema),
  StudentController.deleteStudent,
);

// deleted data
router.delete('/:id', StudentController.deleteStudent);

// all data
router.get('/', StudentController.allStudent);

export const StudentRoute = router;
