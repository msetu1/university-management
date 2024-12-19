import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateSemesterId } from './user.utils';

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
    throw new Error('Invalid admission semester ID');
  }

  // manually generate id
  userData.id = await generateSemesterId(admissionSemester);

  // create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    // Set ID and reference
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    return newStudent;
  } else {
    throw new Error('User creation failed');
  }
};

export const UserService = {
  createStudent,
};
