import config from '../../config';
import { AppError } from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);

  if (!user) {
    throw new AppError(httpStatusCodes.NOT_FOUND, 'This user is not found !');
  }

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatusCodes.FORBIDDEN, 'This user is Deleted !');
  }

  const isUserStatus = user?.status;

  if (isUserStatus === 'blocked') {
    throw new AppError(httpStatusCodes.FORBIDDEN, 'This user is Blocked !');
  }

  // checking if the pass is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatusCodes.FORBIDDEN, 'Password do not matched');
  }
  const jwtPayload = {
    userId: user,
    role: user?.role,
  };
  // create token
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,

    needsPasswordChange: user?.needsPasswordChange,
  };
};
export const AuthService = {
  loginUser,
};
