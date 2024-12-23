import httpStatusCodes from 'http-status-codes';
import { AppError } from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegister } from './semesterRegistration.interface';
import { SemesterRegister } from './semesterRegistration.model';
import { QueryBuilder } from '../../builder/QueryBuilder';
import { RegisterStatus } from './semesterRegistration.constant';

const createSemesterRegister = async (payload: TSemesterRegister) => {
  const academicSemester = payload?.AcademicSemester;

  // check register 'UPCOMING' and 'ONGOING'
  const isUpcomingOrOngoingSemester = await SemesterRegister.findOne({
    $or: [
      { status: RegisterStatus.UPCOMING },
      { status: RegisterStatus.ONGOING },
    ],
  });
  if (isUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      `There is already an ${isUpcomingOrOngoingSemester.status} register semester !`,
    );
  }

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
const updateSemesterRegister = async (
  id: string,
  payload: Partial<TSemesterRegister>,
) => {
  // check semester is exists
  const isSemesterExists = await SemesterRegister.findById(id);

  if (!isSemesterExists) {
    throw new AppError(httpStatusCodes.NOT_FOUND, 'This semester not found !');
  }

  const currentSemesterStatus = isSemesterExists?.status;
  const requestedStatus = payload?.status;

  if (currentSemesterStatus === RegisterStatus.ENDED) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      `This semester is already ${currentSemesterStatus} `,
    );
  }

  // UPCOMING--->ONGOING--->ENDED
  if (
    currentSemesterStatus === RegisterStatus.UPCOMING &&
    requestedStatus === RegisterStatus.ENDED
  ) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      `You can no directly change status form ${currentSemesterStatus} to ${requestedStatus} `,
    );
  }

  if (
    currentSemesterStatus === RegisterStatus.ONGOING &&
    requestedStatus === RegisterStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatusCodes.BAD_REQUEST,
      `You can no directly change status form ${currentSemesterStatus} to ${requestedStatus} `,
    );
  }

  const result = await SemesterRegister.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegisterService = {
  createSemesterRegister,
  allSemesterRegisters,
  singleSemesterRegister,
  updateSemesterRegister,
};
