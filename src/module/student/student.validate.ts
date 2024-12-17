import { z } from 'zod';

// Sub-schema for UserName
const userNameValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'), // Ensures the string is not empty
  middleName: z.string().min(1, 'Middle name is required'),
  lastName: z.string().min(1, 'Last name is required'),
});

// Sub-schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

// Sub-schema for Local Guardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

// Main schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'others'], {
        errorMap: () => ({
          message: "Gender must be 'male', 'female', or 'others'",
        }),
      }),
      dateOfBirth: z.string(),
      email: z.string().email('Invalid email format'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
        errorMap: () => ({ message: 'Invalid blood group' }),
      }),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().url('Invalid URL for profile image'),
      admissionSemester: z.string(),
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: userNameValidationSchema,
      gender: z
        .enum(['male', 'female', 'other.optional()s'], {
          errorMap: () => ({
            message: "Gender must be 'male', 'female', or 'others'",
          }),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Invalid email format').optional(),
      contactNo: z.string().min(1, 'Contact number is required').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required')
        .optional(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
          errorMap: () => ({ message: 'Invalid blood group' }),
        })
        .optional(),
      presentAddress: z
        .string()
        .min(1, 'Present address is required')
        .optional(),
      permanentAddress: z
        .string()
        .min(1, 'Permanent address is required')
        .optional(),
      guardian: guardianValidationSchema.optional(),
      localGuardian: localGuardianValidationSchema.optional(),
      profileImg: z.string().url('Invalid URL for profile image').optional(),
      admissionSemester: z.string().optional(),
    }),
  }),
});

// Export the Zod schema
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
