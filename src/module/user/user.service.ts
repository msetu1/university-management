import mongoose from 'mongoose';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateSemesterId } from './user.utils';
import httpStatusCodes from 'http-status-codes';

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

export const UserService = {
  createStudent,
};
