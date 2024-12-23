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
const updateSemesterRegistrationValidate = z.object({
  AcademicSemester: z.string().optional(),
  status: z
    .enum([...(semesterRegisterStatus as [string, ...string[]])])
    .optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  minCredit: z.number().optional(),
  maxCredit: z.number().optional(),
});

export const SemesterRegistrationValidate = {
  createSemesterRegistrationValidate,
  updateSemesterRegistrationValidate,
};
