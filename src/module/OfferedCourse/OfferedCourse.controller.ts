import { catchAsync } from '../utils/catchAsync';
import { OfferedCourseService } from './OfferedCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.createOfferedCourse(req.body);

  res.status(200).json({
    success: true,
    message: 'Offer Course is created successfully',
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
};
