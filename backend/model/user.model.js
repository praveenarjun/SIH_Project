import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','teacher'],
        default:'student'
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordExpiresAt:{
        type:Date
    },
    verificationToken:{
        type:String
    },
    verifiedTokenExpiresAt:{
        type:Date
    }
},{timestamps: true});
//created and updated are added to the schema

export const User = mongoose.model('User',userSchema);

