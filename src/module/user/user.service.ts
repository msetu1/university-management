/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateSemesterId } from './user.utils';
import httpStatusCodes from 'http-status-codes';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../Faculty/faculty.model';

const createStudent = async (password: string, payload: TStudent) => {
  // create
  const userData: Partial<TUser> = {};
  // jodi password na dey tahole default pass use korbo
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      'Invalid admission semester ID',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // manually generate id
    userData.id = await generateSemesterId(admissionSemester);

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatusCodes.BAD_REQUEST, 'Failed to created user');
    }
    // Set ID and reference
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // create a user (transaction-2)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(
        httpStatusCodes.BAD_REQUEST,
        'Failed to created student',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatusCodes.BAD_REQUEST, 'Failed to create user');
    console.log(err);
  }
};

// create faculties
const createFaculty = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(
        httpStatusCodes.BAD_REQUEST,
        'Failed to create faculty',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserService = {
  createStudent,
  createFaculty,
};
