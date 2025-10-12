import express from "express";
import { UserControllers } from "./user.controller";
const ruoter = express.Router();

ruoter.post('/create-student', UserControllers.createStudent);


export const UserRoutes = ruoter;