import { z } from 'zod';
import { Days, timeValidationRegex } from './OfferedCourse.constant';

// Base schema for validations
const baseSchema = z.object({
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
});

// Extended validation for create schema
const createOfferedCourseValidate = baseSchema.refine(
  (data) => {
    const [startHour, startMinute] = data.startTime.split(':').map(Number);
    const [endHour, endMinute] = data.endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    return startTotalMinutes < endTotalMinutes;
  },
  {
    message: 'Start time should be before end time!',
    path: ['startTime', 'endTime'],
  },
);

// Extended validation for update schema
const updateOfferedCourseValidate = baseSchema
  .omit({
    semesterRegister: true,
    academicFaculty: true,
    academicDepartment: true,
    course: true,
    section: true,
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
      message: 'Start time should be before end time!',
      path: ['startTime', 'endTime'],
    },
  );

export const OfferedCourseValidate = {
  createOfferedCourseValidate,
  updateOfferedCourseValidate,
};
