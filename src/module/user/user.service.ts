import { TUser } from './user.interface';
import { User } from './user.model';

const createStudent = async (password: string, payload: TUser) => {
  const result = await User.create(payload);
  return result;
};
export const UserService = {
  createStudent,
};
