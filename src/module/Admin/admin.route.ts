import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidations } from './admin.validation';

const router = express.Router();

router.get('/', AdminControllers.allAdmins);

router.get('/:id', AdminControllers.singleAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidations.updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
