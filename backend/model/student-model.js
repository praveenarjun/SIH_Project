import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
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
    Semester:{
        type:Number,
        required:true
    },
    contactNo:{
        type:Number,
        required:true
    },
    Branch:{
        type:String,
        required:true
    },
    Intrest:{
        type:String,
        required:true
    }
},{timestamps: true});
//created and updated are added to the schema

export const User = mongoose.model('User',userSchema);

