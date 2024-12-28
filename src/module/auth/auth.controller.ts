import { catchAsync } from '../utils/catchAsync';

const loginUser = catchAsync(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User is logged in successfully !',
    data: {},
  });
});

export const AuthController = {
  loginUser,
};
