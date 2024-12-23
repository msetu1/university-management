import httpStatusCodes from 'http-status-codes';
import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegister } from './semesterRegistration.interface';
import { SemesterRegister } from './semesterRegistration.model';
import { QueryBuilder } from '../../builder/QueryBuilder';

const createSemesterRegister = async (payload: TSemesterRegister) => {
  const academicSemester = payload?.AcademicSemester;

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      'The academic semester not found !',
    );
  }

  const isSemesterExists = await SemesterRegister.findOne({
    academicSemester: academicSemester,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatusCodes.CONFLICT, 'This semester is already !');
  }

  const result = await SemesterRegister.create(payload);
  return result;
};

// all semester
const allSemesterRegisters = async (query: Record<string, unknown>) => {
  const semesterRegisterQuery = new QueryBuilder(
    SemesterRegister.find().populate('AcademicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .select();

  const result = await semesterRegisterQuery.modelQuery;
  return result;
};

// single semester
const singleSemesterRegister = async (id: string) => {
  const result = await SemesterRegister.findById(id);
  return result;
};

// update semester
const updateSemesterRegister = async () => {
  // return result;
};

export const SemesterRegisterService = {
  createSemesterRegister,
  allSemesterRegisters,
  singleSemesterRegister,
  updateSemesterRegister,
};
