import { z } from 'zod';

export const userValidateSchema = z.object({
  body: z.object({
    password: z
      .string({
        invalid_type_error: 'password must be string',
      })
      .max(20, { message: 'password can be more then 20 characters' })
      .optional(),
  }),
});
