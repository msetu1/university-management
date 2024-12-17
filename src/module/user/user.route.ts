import express from 'express';
import { UserController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { userValidateSchema } from './user.validate';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(userValidateSchema),
  UserController.createStudent,
);

export const UserRoute = router;
