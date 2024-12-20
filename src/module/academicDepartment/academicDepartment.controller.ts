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

// all Academic Department
const allAcademicDepartments = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentService.allAcademicDepartments();

  res.status(200).json({
    success: true,
    message: 'Academic Departments is retrieved successfully',
    data: result,
  });
});

// single Academic Department
const singleAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicDepartmentService.singleAcademicDepartment(id);

  res.status(200).json({
    success: true,
    message: 'Single Academic Department is retrieved successfully',
    data: result,
  });
});

// update Academic Department
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await AcademicDepartmentService.updateAcademicDepartment(
    id,
    body,
  );

  res.status(200).json({
    success: true,
    message: 'Academic Department is updated successfully',
    data: result,
  });
});

// delete Academic Department
const deleteAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AcademicDepartmentService.deleteAcademicDepartment(id);

  res.status(200).json({
    success: true,
    message: 'Academic Department is deleted successfully',
    data: {},
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  allAcademicDepartments,
  singleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
