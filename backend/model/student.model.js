import mongoose from 'mongoose';
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
        ref: 'teacher',
        // default: null
    }]

}, { timestamps: true });

export const student = mongoose.model('student', studentSchema);