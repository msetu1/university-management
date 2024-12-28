import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validate';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoute = router;
