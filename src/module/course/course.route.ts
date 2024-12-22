import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router();

router.post('/create-course', CourseController.createCourse);
router.get('/:id', CourseController.singleCourse);
router.patch('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.get('/', CourseController.allCourses);

export const CourseRoute = router;
