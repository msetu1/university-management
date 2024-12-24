import { z } from 'zod';
import { Days, timeValidationRegex } from './OfferedCourse.constant';

const timeStartSchema = z
  .string()
  .regex(timeValidationRegex, { message: 'Invalid start time format' });
const timeEndSchema = z
  .string()
  .regex(timeValidationRegex, { message: 'Invalid end time format' });

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
    startTime: timeStartSchema,
    endTime: timeEndSchema,
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

const updateOfferedCourseValidate = z
  .object({
    faculty: z.string(),
    maxCapacity: z.number(),
    days: z.array(z.enum([...Days] as [string, ...string[]])),
    startTime: timeStartSchema,
    endTime: timeEndSchema,
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

export const OfferedCourseValidate = {
  createOfferedCourseValidate,
  updateOfferedCourseValidate,
};
