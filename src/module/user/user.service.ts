import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudent = async (password: string, studentData: TStudent) => {
  // create
  const userData: Partial<TUser> = {};
  // jodi password na dey tahole default pass use korbo
  userData.password = password || (config.default_pass as string);

  // set student role
  userData.role = 'student';

  // manually generate id
  userData.id = '2030100001';

  // create a user
  const newUser = await User.create(userData);

  // create a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; // ref _id
  }
  const newStudent = await Student.create(studentData);
  return newStudent;
};
export const UserService = {
  createStudent,
};
