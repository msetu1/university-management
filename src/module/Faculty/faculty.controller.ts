import { catchAsync } from '../utils/catchAsync';
import { FacultyServices } from './faculty.service';

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacultyServices.getSingleFaculty(id);

  res.status(200).json({
    success: true,
    message: 'Faculty is retrieved successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFaculties(req.query);

  res.status(200).json({
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const faculty = req.body;
  const result = await FacultyServices.updateFaculty(id, faculty);

  res.status(200).json({
    success: true,
    message: 'Faculty is updated successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  await FacultyServices.deleteFaculty(id);

  res.status(200).json({
    success: true,
    message: 'Faculty is deleted successfully',
    data: {},
  });
});

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
