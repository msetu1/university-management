import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatusCodes from 'http-status-codes';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // const isDeleted = isUserExists?.isDeleted;

  // if (isDeleted) {
  //   throw new AppError(httpStatusCodes.FORBIDDEN, 'This user is Deleted !');
  // }

  // const isUserStatus = isUserExists?.status;

  // if (isUserStatus === 'blocked') {
  //   throw new AppError(httpStatusCodes.FORBIDDEN, 'This user is Blocked !');
  // }

  // checking if the pass is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatusCodes.NOT_FOUND, 'Password do not matched');
  }
};
export const AuthService = {
  loginUser,
};
