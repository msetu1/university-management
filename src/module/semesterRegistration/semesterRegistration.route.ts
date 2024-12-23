import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { SemesterRegisterController } from './semesterRegistration.controller';
import { SemesterRegistrationValidate } from './semesterRegistration.validate';

const router = express.Router();

router.post(
  '/create-semester-register',
  validateRequest(
    SemesterRegistrationValidate.createSemesterRegistrationValidate,
  ),
  SemesterRegisterController.createSemesterRegister,
);

router.get('/:id', SemesterRegisterController.singleSemesterRegister);

// router.patch(
//   '/:id',
//   validateRequest(),
//   SemesterRegisterController.updateSemesterRegister,
// );

router.get('/', SemesterRegisterController.allSemesterRegisters);

export const SemesterRegisterRoute = router;
