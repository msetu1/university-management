import { catchAsync } from '../utils/catchAsync';
import { UserService } from './user.service';

// create data
const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  const result = await UserService.createStudent(password, student);

  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
};
