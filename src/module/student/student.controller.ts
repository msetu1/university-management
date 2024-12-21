import { catchAsync } from '../utils/catchAsync';
import { StudentService } from './student.service';

// all data
const allStudent = catchAsync(async (req, res) => {
  const result = await StudentService.allStudents(req.query);

  res.status(200).json({
    success: true,
    message: 'Students are retrieved successfully',
    data: result,
  });
});

// single data
const singleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.singleStudent(id);

  res.status(200).json({
    success: true,
    message: 'Single student was retrieved successfully',
    data: result,
  });
});

// update data
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await StudentService.updateStudent(id, body);

  res.status(200).json({
    success: true,
    message: 'student updated successfully',
    data: result,
  });
});
// delete data
const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  await StudentService.deleteStudent(id);

  res.status(200).json({
    success: true,
    message: 'Student data deleted successfully',
    data: {},
  });
});

export const StudentController = {
  allStudent,
  singleStudent,
  deleteStudent,
  updateStudent,
};
