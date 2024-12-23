import { catchAsync } from '../utils/catchAsync';
import { SemesterRegisterService } from './semesterRegistration.service';

const createSemesterRegister = catchAsync(async (req, res) => {
  const result = await SemesterRegisterService.createSemesterRegister(req.body);
  res.status(200).json({
    success: true,
    message: 'Semester Register is created successfully',
    data: result,
  });
});

const allSemesterRegisters = catchAsync(async (req, res) => {
  const result = await SemesterRegisterService.allSemesterRegisters(req.query);
  res.status(200).json({
    success: true,
    message: 'Semester Register is retrieved successfully',
    data: result,
  });
});

const singleSemesterRegister = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemesterRegisterService.singleSemesterRegister(id);
  res.status(200).json({
    success: true,
    message: 'Single semester Course is retrieved successfully',
    data: result,
  });
});

// const updateSemesterRegister = catchAsync(async (req, res) => {
//     const { id } = req.params;
//     const body = req.body;
//     const result = await SemesterRegisterService.updateSemesterRegister(id, body);
//     res.status(200).json({
//       success: true,
//       message: 'Academic semester is updated successfully',
//       data: result,
//     });
// });
export const SemesterRegisterController = {
  createSemesterRegister,
  allSemesterRegisters,
  singleSemesterRegister,
  // updateSemesterRegister,
};
