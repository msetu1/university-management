import { catchAsync } from '../utils/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';

// create Academic Department
const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.createAcademicDepartment(
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Academic Department is created successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
};
