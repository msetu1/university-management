import { TStudent } from './student.interface';
import { Student } from './student.model';

// all data
const allStudents = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// single data
const singleStudent = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

// update data
const updateStudent = async (id: string, payload: TStudent) => {
  const result = await Student.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// delete data
const deleteStudent = async (id: string) => {
  const result = await Student.findByIdAndDelete(id);
  return result;
};

export const StudentService = {
  allStudents,
  singleStudent,
  deleteStudent,
  updateStudent,
};
