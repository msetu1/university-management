import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import httpStatusCodes from 'http-status-codes';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  MonthSchema,
} from './academicSemester.constant';
import { AppError } from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemesterName, required: true },
    year: { type: String, required: true },
    code: {
      type: String,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      enum: MonthSchema,
      required: true,
    },
    endMonth: {
      type: String,
      enum: MonthSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
// same year a 2 ta same name a semster create kora jabe na
academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(
      httpStatusCodes.NOT_FOUND,
      'Semester is already exists !',
    );
  }

  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
