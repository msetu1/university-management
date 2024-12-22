import express from 'express';
import { CourseController } from './course.controller';
import { CourseValidations } from './course.validate';
import { validateRequest } from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);
router.get('/:id', CourseController.singleCourse);
router.patch('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.allCourses);

export const CourseRoute = router;
