import { catchAsync } from '../utils/catchAsync';
import { UserService } from './user.service';

// create data
const createStudent = catchAsync(async (req, res) => {
  const { password, payload } = req.body;

  const result = await UserService.createStudent(password, payload);

  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
