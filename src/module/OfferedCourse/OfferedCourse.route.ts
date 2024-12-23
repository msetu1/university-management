import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { OfferedCourseValidate } from './OfferedCourse.validate';
import { OfferedCourseController } from './OfferedCourse.controller';

const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidate.createOfferedCourseValidate),
  OfferedCourseController.createOfferedCourse,
);

export const OfferedCourseRoute = router;
