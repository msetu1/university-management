import { catchAsync } from '../utils/catchAsync';
import { AcademicSemesterService } from './academicSemester.service';

// create semester
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.createAcademicSemester(req.body);

  res.status(200).json({
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

// all semester
const allAcademicSemesters = catchAsync(async (req, res) => {
  const result = await AcademicSemesterService.allAcademicSemesters();

  res.status(200).json({
    success: true,
    message: 'Academic semester is retrieved successfully',
    data: result,
  });
});

// single semester
const singleAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.singleAcademicSemester(id);

  res.status(200).json({
    success: true,
    message: 'Single Academic semester is retrieved successfully',
    data: result,
  });
});

// update semester
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await AcademicSemesterService.updateAcademicSemester(id, body);

  res.status(200).json({
    success: true,
    message: 'Academic semester is updated successfully',
    data: result,
  });
});

// delete semester
const deleteAcademicSemester = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicSemesterService.deleteAcademicSemester(id);

  res.status(200).json({
    success: true,
    message: 'Academic semester is deleted successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  allAcademicSemesters,
  singleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
