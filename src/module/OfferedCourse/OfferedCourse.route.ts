/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { OfferedCourseController } from './OfferedCourse.controller';
import { OfferedCourseValidate } from './OfferedCourse.validate';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidate.createOfferedCourseValidate as any), // Ensure type consistency if needed
  OfferedCourseController.createOfferedCourse,
);

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidate.updateOfferedCourseValidate as any),
  OfferedCourseController.updateOfferedCourse,
);

export const OfferedCourseRoute = router;
