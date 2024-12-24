import { AppError } from '../../errors/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../course/course.model';
import { Faculty } from '../Faculty/faculty.model';
import { SemesterRegister } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './OfferedCourse.interface';
import { OfferedCourse } from './OfferedCourse.model';
import httpStatusCodes from 'http-status-codes';
import { hasTimeConflict } from './OfferedCourse.utils';

const createOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegister,
    academicFaculty,
    academicDepartment,
    course,
    section,
    faculty,
    days,
    startTime,
    endTime,
  } = payload;

  // Step 1: check if the semester registration id is exists!
  const isSemesterRegisterExits =
    await SemesterRegister.findById(semesterRegister);

  if (!isSemesterRegisterExits) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      'Semester registration is not found',
    );
  }
  const academicSemester = isSemesterRegisterExits.academicSemester;

  // Step 2: check if the academic faculty id is exists!
  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);

  if (!isAcademicFacultyExits) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      'Academic Faculty is not found',
    );
  }
  // Step 3: check if the academic department id is exists!
  const isAcademicDepartmentExits =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      'Academic Department is not found',
    );
  }

  // Step 4: check if the course id is exists!
  const isCourseExits = await Course.findById(course);

  if (!isCourseExits) {
    throw new AppError(httpStatusCodes.NOT_FOUND, 'Course is not found');
  }

  // Step 5: check if the faculty id is exists!
  const isFacultyExits = await Faculty.findById(faculty);

  if (!isFacultyExits) {
    throw new AppError(httpStatusCodes.NOT_FOUND, 'Faculty is not found');
  }

  // Step 6: check if the department is belong to the  faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      `This ${isAcademicDepartmentExits?.name} is not belong to the ${isAcademicFacultyExits?.name} `,
    );
  }

  // Step 7: check if the same offered course same section in same registered semester exists
  const isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({ semesterRegister, course, section });

  if (isSameOfferedCourseExistsWithSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      `Offered course is already in the same section`,
    );
  }

  // Step 8: get the schedules of the faculties
  const assignedSchedules = await OfferedCourse.find({
    semesterRegister,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  // Step 9: check if the faculty is available at that time. If not then throw error
  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatusCodes.CONFLICT,
      'this faculty in not available at that time ! choose other time or day',
    );
  }

  // Step 10: create the offered course
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;

  return null;
};

export const OfferedCourseService = {
  createOfferedCourse,
};
