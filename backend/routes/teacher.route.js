import express from 'express';
import {teacherform} from '../controllers/teacher.controller.js';
const Router = express.Router();

Router.get('/teacher', () => {
    console.log("Hello teacher");
})
Router.post("/Teacher-details",teacherform);
export default Router;