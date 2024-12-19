import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterValidate } from './academicSemester.validate';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidate.createAcademicSemesterValidate),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoute = router;
