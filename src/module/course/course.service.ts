import { TCourse } from './course.interface';
import { Course } from './course.model';

// create Course
const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const allCourse = async () => {
  const result = await Course.find();
  return result;
};

export const CourseService = {
  createCourse,
  allCourse,
  // allFaculties,
  // singleCourse,
  // updateCourse,
  // deleteCourse,
};
