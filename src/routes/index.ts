import { Router } from 'express';
import { UserRoute } from '../module/user/user.route';
import { StudentRoute } from '../module/student/student.route';
import { AcademicSemesterRoute } from '../module/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../module/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../module/academicDepartment/academicDepartment.route';
import { CourseRoute } from '../module/course/course.route';
import { SemesterRegisterRoute } from '../module/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoute } from '../module/OfferedCourse/OfferedCourse.route';
import { FacultyRoutes } from '../module/Faculty/faculty.route';
import { AdminRoutes } from '../module/Admin/admin.route';
import { AuthRoute } from '../module/auth/auth.route';

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
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoute,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/courses',
    route: CourseRoute,
  },
  {
    path: '/semester-registers',
    route: SemesterRegisterRoute,
  },
  {
    path: '/offered-courses',
    route: OfferedCourseRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
