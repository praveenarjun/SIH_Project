import mongoose from 'mongoose';
const teacherSchema = new mongoose.Schema({
    photo: {
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    experience:{
        type:Number,
        required:true
    },
    contactNo:{
        type:Number,
        required:true
    },
    field:{
        type:String,
        required:true
    },
    Qualification:{
        type:String,
        required:true
    },
    linkedinProfile:{
        type:String,
        required:true
    },
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    }]

},{timestamps: true});
//created and updated are added to the schema

export const teacher = mongoose.model('Teacher',teacherSchema);
