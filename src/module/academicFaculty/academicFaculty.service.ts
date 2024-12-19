import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// create faculty
const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// all faculty
const allAcademicFaculties = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

// single faculty
const singleAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// update faculty
const updateAcademicFaculty = async (id: string, payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

// delete faculty
const deleteAcademicFaculty = async (id: string) => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  allAcademicFaculties,
  singleAcademicFaculty,
  updateAcademicFaculty,
  deleteAcademicFaculty,
};
