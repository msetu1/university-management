import { z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  MonthSchema,
} from './academicSemester.constant';

const createAcademicSemesterValidate = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
    year: z.string(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...MonthSchema] as [string, ...string[]]),
    endMonth: z.enum([...MonthSchema] as [string, ...string[]]),
  }),
});

const updateAcademicSemesterValidate = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterName] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    code: z.enum([...AcademicSemesterCode] as [string, ...string[]]).optional(),
    startMonth: z.enum([...MonthSchema] as [string, ...string[]]).optional(),
    endMonth: z.enum([...MonthSchema] as [string, ...string[]]).optional(),
  }),
});

export const AcademicSemesterValidate = {
  createAcademicSemesterValidate,
  updateAcademicSemesterValidate,
};
