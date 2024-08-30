import express from 'express';
import {studentform} from '../controllers/student.controller.js';

const Router = express.Router();

Router.get('/student' , () =>{
    console.log('Student route');
})

Router.post("/details",studentform);

export  default  Router
