import { z } from 'zod';

export const userValidateSchema = z.object({
  password: z
    .string({ invalid_type_error: 'password must be 20 characters' })
    .max(20, { message: 'password can not be more then 20 characters' })
    .optional(),
  status: z.enum(['in-progress', 'blocked']).default('in-progress'),
});
