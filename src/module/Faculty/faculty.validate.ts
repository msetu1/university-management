import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

export const createFacultyValidationSchema = z.object({
  password: z.string().max(20),
  faculty: z.object({
    designation: z.string(),
    name: createUserNameValidationSchema,
    gender: z.enum(['male', 'female', 'others'], {
      errorMap: () => ({
        message: "Gender must be 'male', 'female', or 'others'",
      }),
    }),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Invalid blood group' }),
    }),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    academicDepartment: z.string(),
    profileImg: z.string(),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

export const updateFacultyValidationSchema = z.object({
  designation: z.string().optional(),
  name: updateUserNameValidationSchema.optional(),
  gender: z
    .enum(['male', 'female', 'others'], {
      errorMap: () => ({
        message: "Gender must be 'male', 'female', or 'others'",
      }),
    })
    .optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Invalid blood group' }),
    })
    .optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  profileImg: z.string().optional(),
  academicDepartment: z.string().optional(),
});

export const FacultyValidations = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};
