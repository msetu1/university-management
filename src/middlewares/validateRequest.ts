import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import { catchAsync } from '../module/utils/catchAsync';

export const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;

    next();
  });
};
