import { z } from 'zod';

export const createAcademicDepartmentValidateSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Department must be string',
    required_error: 'name is required',
  }),
  academicFaculty: z.string({
    invalid_type_error: 'Academic Department must be string',
    required_error: 'Faculty is required',
  }),
});
export const updateAcademicDepartmentValidateSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'name is required',
    })
    .optional(),
  academicFaculty: z
    .string({
      invalid_type_error: 'Academic Department must be string',
      required_error: 'Faculty is required',
    })
    .optional(),
});

export const AcademicDepartmentValidate = {
  createAcademicDepartmentValidateSchema,
  updateAcademicDepartmentValidateSchema,
};
