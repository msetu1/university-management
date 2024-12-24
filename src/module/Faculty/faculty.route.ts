import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyValidations } from './faculty.validate';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(FacultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
