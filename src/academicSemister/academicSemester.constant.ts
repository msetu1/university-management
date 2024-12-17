import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameCode,
  TMonths,
} from './academicSemester.interface';

export const MonthSchema: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export interface AcademicSemesterNameCode {
  [key: string]: string;
}

export const academicSemesterNameCode: TAcademicSemesterNameCode = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
