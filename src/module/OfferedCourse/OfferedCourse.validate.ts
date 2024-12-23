import { z } from 'zod';
import { Days } from './OfferedCourse.constant';

const createOfferedCourseValidate = z.object({
  semesterRegister: z.string(),
  academicSemester: z.string(),
  academicFaculty: z.string(),
  academicDepartment: z.string(),
  course: z.string(),
  faculty: z.string(),
  maxCapacity: z.number(),
  section: z.number(),
  days: z.enum([...Days] as [string, ...string[]]),
  startTime: z.string(),
  endTime: z.string(),
});

const updateOfferedCourseValidate = z.object({
  faculty: z.string().optional(),
  maxCapacity: z.number().optional(),
  days: z.enum([...Days] as [string, ...string[]]).optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
});

export const OfferedCourseValidate = {
  createOfferedCourseValidate,
  updateOfferedCourseValidate,
};
