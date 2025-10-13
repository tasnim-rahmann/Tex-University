import express from "express";
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";

const router = express.Router();
const moduleRoute = [
    { path: '/users', route: UserRoutes },
    { path: '/students', route: StudentRoutes },
    { path: '/academic-semesters', route: AcademicSemesterRoutes },
    { path: '/academic-faculties', route: AcademicFacultyRoutes },
];

moduleRoute.forEach(route => router.use(route.path, route.route));

export default router;