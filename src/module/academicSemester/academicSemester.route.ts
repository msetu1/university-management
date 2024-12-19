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

router.get('/:id', AcademicSemesterController.singleAcademicSemester);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidate.updateAcademicSemesterValidate),
  AcademicSemesterController.updateAcademicSemester,
);

router.delete('/:id', AcademicSemesterController.deleteAcademicSemester);

router.get('/', AcademicSemesterController.allAcademicSemesters);

export const AcademicSemesterRoute = router;
