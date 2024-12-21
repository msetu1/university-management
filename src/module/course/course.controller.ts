import { catchAsync } from '../utils/catchAsync';
import { CourseService } from './course.service';

// create Academic Faculty
const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourse(req.body);

  res.status(200).json({
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  // allFaculties,
  // singleCourse,
  // updateCourse,
  // deleteCourse,
};
