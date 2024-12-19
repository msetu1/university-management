import { catchAsync } from '../utils/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';

// create Academic Faculty
const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFaculty(req.body);

  res.status(200).json({
    success: true,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});

// all Academic Faculty
const allAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.allAcademicFaculties();

  res.status(200).json({
    success: true,
    message: 'Academic Faculty is retrieved successfully',
    data: result,
  });
});

// single Academic Faculty
const singleAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.singleAcademicFaculty(id);

  res.status(200).json({
    success: true,
    message: 'Single Academic Faculty is retrieved successfully',
    data: result,
  });
});

// update Academic Faculty
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await AcademicFacultyService.updateAcademicFaculty(id, body);

  res.status(200).json({
    success: true,
    message: 'Academic Faculty is updated successfully',
    data: result,
  });
});

// delete Academic Faculty
const deleteAcademicFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  await AcademicFacultyService.deleteAcademicFaculty(id);

  res.status(200).json({
    success: true,
    message: 'Academic Faculty is deleted successfully',
    data: {},
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  allAcademicFaculties,
  singleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
