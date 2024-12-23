import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { SemesterRegisterController } from './semesterRegistration.controller';

const router = express.Router();

router.post(
  '/create-semester-register',
  validateRequest(),
  SemesterRegisterController.createSemesterRegister,
);

router.get(
  '/:id',
  validateRequest(),
  SemesterRegisterController.singleSemesterRegister,
);

router.patch(
  '/:id',
  validateRequest(),
  SemesterRegisterController.updateSemesterRegister,
);

router.get(
  '/',
  validateRequest(),
  SemesterRegisterController.allSemesterRegisters,
);

export const SemesterRegisterRoute = router;
