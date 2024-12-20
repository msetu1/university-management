import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post(
  '/create-academic-department',
  AcademicDepartmentController.createAcademicDepartment,
);

export const AcademicDepartmentRoute = router;
