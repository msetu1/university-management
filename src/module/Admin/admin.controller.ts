import { catchAsync } from '../utils/catchAsync';
import { AdminServices } from './admin.service';

const singleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.SingleAdmin(id);

  res.status(200).json({
    success: true,
    message: 'Single Admin  retrieved  successfully',
    data: result,
  });
});

const allAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.AllAdmins(req.query);

  res.status(200).json({
    success: true,
    message: 'All Admin  retrieved  successfully',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdmin(id, admin);

  res.status(200).json({
    success: true,
    message: ' Admin updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdmin(id);

  res.status(200).json({
    success: true,
    message: ' Admin  deleted  successfully',
    data: result,
  });
});

export const AdminControllers = {
  allAdmins,
  singleAdmin,
  deleteAdmin,
  updateAdmin,
};
