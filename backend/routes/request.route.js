// backend/routes/request.route.js
import express from 'express';
import { sendRequestToTeacher, acceptRequest } from '../controllers/teacher.controller.js';
const Router = express.Router();

Router.post('/send-request', sendRequestToTeacher);
Router.post('/accept-request', acceptRequest);

export default Router;