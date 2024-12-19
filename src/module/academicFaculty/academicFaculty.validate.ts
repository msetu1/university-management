import { z } from 'zod';

export const academicFacultyValidateSchema = z.object({
  name: z.string({ invalid_type_error: 'Academic faculty must be string' }),
});
