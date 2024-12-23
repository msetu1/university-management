import { z } from 'zod';
import { semesterRegisterStatus } from './semesterRegistration.constant';

const createSemesterRegistrationValidate = z.object({
  AcademicSemester: z.string(),
  status: z.enum([...(semesterRegisterStatus as [string, ...string[]])]),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  minCredit: z.number(),
  maxCredit: z.number(),
});

export const SemesterRegistrationValidate = {
  createSemesterRegistrationValidate,
};
