import { academicSemesterNameCode } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

// create semester
const createAcademicSemester = async (payload: TAcademicSemester) => {
  // semester name -->semester code
  if (academicSemesterNameCode[payload.name] !== payload.code) {
    throw new Error('Invalid semester name code');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

// all semester
const allAcademicSemesters = async () => {
  const result = await AcademicSemester.find();
  return result;
};

// single semester
const singleAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

// update semester
const updateAcademicSemester = async (
  id: string,
  payload: TAcademicSemester,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCode[payload.name] !== payload.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true },
  );
  return result;
};

// delete semester
const deleteAcademicSemester = async (id: string) => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  allAcademicSemesters,
  singleAcademicSemester,
  updateAcademicSemester,
  deleteAcademicSemester,
};
