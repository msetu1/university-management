import { QueryBuilder } from '../../builder/QueryBuilder';
import { TCourse } from './course.interface';
import { Course } from './course.model';

// create Course
const createCourse = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

// all courses
const allCourses = async (query: Record<string, unknown>) => {
  const searchable = ['title', 'prefix', 'code'];
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(searchable)
    .filter()
    .sort()
    .paginate();

  const result = await courseQuery?.modelQuery;
  return result;
};

// single courses
const singleCourse = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

// update courses
const updateCourse = async (id: string, payload: TCourse) => {
  const result = await Course.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// delete courses
const deleteCourse = async (id: string) => {
  const result = await Course.findByIdAndDelete(id);
  return result;
};

export const CourseService = {
  createCourse,
  allCourses,
  singleCourse,
  updateCourse,
  deleteCourse,
};
