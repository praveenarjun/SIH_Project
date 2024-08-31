import express from 'express';
import {studentform} from '../controllers/student.controller.js';
import {getStudentForm} from "../controllers/student.controller.js";
import router from "./auth.route.js";

const Router = express.Router();

router.get('/student-form', getStudentForm);

Router.post("/details",studentform);

export  default  Router
