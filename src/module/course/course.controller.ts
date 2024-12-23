import { catchAsync } from '../utils/catchAsync';
import { CourseService } from './course.service';

// create course
const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourse(req.body);

  res.status(200).json({
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

// ALL courses
const allCourses = catchAsync(async (req, res) => {
  const result = await CourseService.allCourses(req.query);

  res.status(200).json({
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});

// single course
const singleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.singleCourse(id);

  res.status(200).json({
    success: true,
    message: 'Single Course is retrieved successfully',
    data: result,
  });
});

// update course
const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await CourseService.updateCourse(id, body);

  res.status(200).json({
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});

// course assign Faculties
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.assignFacultiesWithCourse(
    courseId,
    faculties,
  );

  res.status(200).json({
    success: true,
    message: 'Course assign Faculties is created successfully',
    data: result,
  });
});

// course remove Faculties
const removeFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.removeFacultiesWithCourse(
    courseId,
    faculties,
  );

  res.status(200).json({
    success: true,
    message: 'Course Faculties is deleted successfully',
    data: result,
  });
});

// delete course
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  await CourseService.deleteCourse(id);

  res.status(200).json({
    success: true,
    message: 'Course is deleted successfully',
    data: {},
  });
});

export const CourseController = {
  createCourse,
  allCourses,
  singleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse,
};
