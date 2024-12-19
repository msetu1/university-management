import { z } from 'zod';

export const createAcademicFacultyValidateSchema = z.object({
  name: z.string({ invalid_type_error: 'Academic faculty must be string' }),
});
export const updateAcademicFacultyValidateSchema = z.object({
  name: z
    .string({ invalid_type_error: 'Academic faculty must be string' })
    .optional(),
});

export const AcademicFacultyValidate = {
  createAcademicFacultyValidateSchema,
  updateAcademicFacultyValidateSchema,
};
