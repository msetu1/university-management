import { TCourse } from './course.interface';
import { Course } from './course.model';

// create Course
const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

export const CourseService = {
  createCourse,
  // allFaculties,
  // singleCourse,
  // updateCourse,
  // deleteCourse,
};
