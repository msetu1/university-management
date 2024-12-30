import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyValidate } from './academicFaculty.validate';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidate.createAcademicFacultyValidateSchema),
  AcademicFacultyController.createAcademicFaculty,
);
router.get('/:id', AcademicFacultyController.singleAcademicFaculty);
router.put(
  '/:id',
  validateRequest(AcademicFacultyValidate.updateAcademicFacultyValidateSchema),
  AcademicFacultyController.updateAcademicFaculty,
);
router.delete('/:id', AcademicFacultyController.deleteAcademicFaculty);
router.get('/', auth(), AcademicFacultyController.allAcademicFaculties);

export const AcademicFacultyRoute = router;
