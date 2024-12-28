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

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFaculty(password, facultyData);

  res.status(200).json({
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdmin(password, adminData);

  res.status(200).json({
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
