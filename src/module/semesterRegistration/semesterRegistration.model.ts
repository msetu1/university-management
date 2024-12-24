import { model, Schema } from 'mongoose';
import { TSemesterRegister } from './semesterRegistration.interface';
import { semesterRegisterStatus } from './semesterRegistration.constant';

const semesterRegisterSchema = new Schema<TSemesterRegister>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'AcademicSemester',
    },
    status: {
      type: String,
      enum: semesterRegisterStatus,
      default: 'UPCOMING',
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    minCredit: { type: Number, default: 3 },
    maxCredit: { type: Number, default: 15 },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegister = model<TSemesterRegister>(
  'SemesterRegister',
  semesterRegisterSchema,
);
