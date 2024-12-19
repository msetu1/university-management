import { Router } from 'express';
import { UserRoute } from '../module/user/user.route';
import { StudentRoute } from '../module/student/student.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../module/academicFaculty/academicFaculty.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/students',
    route: StudentRoute,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
