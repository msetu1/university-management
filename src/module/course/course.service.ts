/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import { AppError } from '../../errors/AppError';
import httpStatusCodes from 'http-status-codes';

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
    .paginate()
    .select();

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
const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updateBasicCourse = await Course.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourse) {
      throw new AppError(
        httpStatusCodes.BAD_REQUEST,
        'failed to update course',
      );
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisite = preRequisiteCourses
        ?.filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatusCodes.BAD_REQUEST,
          'failed to update course',
        );
      }

      const newPreRequisite = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted,
      );
      const newPreRequisiteCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisite } },
        },
        { new: true, runValidators: true, session },
      );

      if (!newPreRequisiteCourse) {
        throw new AppError(
          httpStatusCodes.BAD_REQUEST,
          'failed to update course',
        );
      }

      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );
      return result;
    }

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatusCodes.BAD_REQUEST, 'failed to update course');
  }
};

// assign Faculties With Course
const assignFacultiesWithCourse = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );

  return result;
};

// remove Faculties With Course
const removeFacultiesWithCourse = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    { new: true },
  );

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
  assignFacultiesWithCourse,
  removeFacultiesWithCourse,
};
