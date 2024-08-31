import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../backend/db/connectDB.js';

dotenv.config();

connectDB();

const studentSchema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    semester: {
        type: Number,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    intrest: {
        type: String,
        required: true
    },
    acceptedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher'
    }]
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

const fetchStudents = async () => {
    try {
        const students = await Student.find();
        console.log('Students data:', students);
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        mongoose.connection.close();
    }
};

fetchStudents();