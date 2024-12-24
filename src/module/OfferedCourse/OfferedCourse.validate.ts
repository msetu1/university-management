import { z } from 'zod';
import { Days, timeValidationRegex } from './OfferedCourse.constant';

const createOfferedCourseValidate = z
  .object({
    semesterRegister: z.string(),
    academicFaculty: z.string(),
    academicDepartment: z.string(),
    course: z.string(),
    faculty: z.string(),
    maxCapacity: z.number(),
    section: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: z
      .string()
      .regex(timeValidationRegex, { message: 'Invalid start time format' }),
    endTime: z
      .string()
      .regex(timeValidationRegex, { message: 'Invalid end time format' }),
  })
  .refine(
    (data) => {
      const [startHour, startMinute] = data.startTime.split(':').map(Number);
      const [endHour, endMinute] = data.endTime.split(':').map(Number);

      const startTotalMinutes = startHour * 60 + startMinute;
      const endTotalMinutes = endHour * 60 + endMinute;

      return startTotalMinutes < endTotalMinutes;
    },
    {
      message: 'start time should be before end time!',
      path: ['startTime', 'endTime'],
    },
  );

const updateOfferedCourseValidate = z.object({
  faculty: z.string().optional(),
  maxCapacity: z.number().optional(),
  days: z.array(z.enum([...Days] as [string, ...string[]])),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export const OfferedCourseValidate = {
  createOfferedCourseValidate,
  updateOfferedCourseValidate,
};
