import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import studentRoute from "./routes/student.route.js";
import teacherRoute from "./routes/teacher.route.js";
import requestRouter from './routes/request.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json()); //allows incoming from json

app.get('/', (req, res) => {
    res.send('Hello World !');
});
app.use("/api/auth",authRoutes);
app.use("/student",studentRoute)
app.use("/teacher",teacherRoute)
app.use("/request",requestRouter)
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port :',PORT);
});

