import { academicSemesterNameCode } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemester = async (payload: TAcademicSemester) => {
  // semester name -->semester code
  if (academicSemesterNameCode[payload.name] !== payload.code) {
    throw new Error('Invalid semester name code');
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
