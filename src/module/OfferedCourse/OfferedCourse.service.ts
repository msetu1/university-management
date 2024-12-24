import { AppError } from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { Course } from '../course/course.model';
import { SemesterRegister } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';
import httpStatusCodes from 'http-status-codes';

const createOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegister,
    academicSemester,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  const isSemesterRegisterExists =
    await SemesterRegister.findById(semesterRegister);

  if (!isSemesterRegisterExists) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      'semester registration not found',
    );
  }

  const academicSemesters = isSemesterRegisterExists.AcademicSemester;
  console.log(academicSemesters);

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      'Academic semester not found',
    );
  }

  const isAcademicFacultyExists =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExists) {
    throw new AppError(httpStatusCodes.NOT_FOUND, 'Academic Faculty not found');
  }

  const isAcademicDepartmentExists =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExists) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      'Academic Department not found',
    );
  }

  const isCourseExists = await Course.findById(course);

  if (!isCourseExists) {
    throw new AppError(httpStatusCodes.NOT_FOUND, 'Course not found');
  }

  // const isFacultyExists=await AcademicSemester.findById(faculty);

  // if(!isFacultyExists){
  //   throw new AppError(httpStatusCodes.NOT_FOUND,'Faculty not found')
  // }

  const result = await OfferedCourse.create({ ...payload, academicSemesters });
  return result;
};

export const OfferedCourseService = {
  createOfferedCourse,
};
