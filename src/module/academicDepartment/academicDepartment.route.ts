import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentValidate } from './academicDepartment.validate';

const router = express.Router();

router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidate.createAcademicDepartmentValidateSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get('/:id', AcademicDepartmentController.singleAcademicDepartment);
router.put(
  '/:id',
  validateRequest(
    AcademicDepartmentValidate.updateAcademicDepartmentValidateSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);
router.get('/', AcademicDepartmentController.allAcademicDepartments);

export const AcademicDepartmentRoute = router;
