import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

// create Department
const createAcademicDepartment = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

// all Department
const allAcademicDepartments = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

// single Department
const singleAcademicDepartment = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

// update Department
const updateAcademicDepartment = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// delete Department
const deleteAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  allAcademicDepartments,
  singleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
