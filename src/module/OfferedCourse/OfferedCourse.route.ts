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

router.patch(
  '/:id',
  validateRequest(OfferedCourseValidate.updateOfferedCourseValidate),
  OfferedCourseController.updateOfferedCourse,
);

export const OfferedCourseRoute = router;
