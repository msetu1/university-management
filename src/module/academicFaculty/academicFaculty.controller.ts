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

export const AcademicFacultyController = {
  createAcademicFaculty,
};
