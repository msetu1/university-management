import { catchAsync } from '../utils/catchAsync';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  res.status(200).json({
    success: true,
    message: 'User is logged in successfully !',
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
