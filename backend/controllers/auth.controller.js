import { User } from '../model/user.model.js';
import bcrypt from 'bcryptjs';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';
import { sendWelcomeEmail } from '../mailtrap/emails.js';
import crypto from 'crypto';
import { sendResetPasswordResetEmail } from '../mailtrap/emails.js';
import bcryptjs from 'bcryptjs';




export const signup =async (req, res) => {
    const {email, password, name,role} = req.body;
    try{
        if(!email || !password || !name ||!role){
            throw new Error("All fields are required");
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({success:false,message:"User already exists"});
        }
        if (role === 'teacher') {
            return res.redirect('/signup/teacher');
        }
        if(role === 'student'){
            return res.redirect('/signup/student');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verifiedTokenExpiresAt:Date.now() + 24*60*60*1000
        })
        await user.save();
        //jwt
        generateTokenAndSetCookie(res,user._id);
        await sendVerificationEmail(user.email,verificationToken);
        res.status(201).json({success:true,
            message:"User created successfully",
            user: {
            ...user._doc,
                password:undefined
            },
        });
    }catch(err){
        res.status(400).json({success:false,message:err.message});
    }
}

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try{
        const user = await User.findOne({
            verificationToken:code,
            verifiedTokenExpiresAt:{$gt:Date.now()}
        });
        if(!user){
            return res.status(400).json({success:false,message:"Invalid or expired verification code"});
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verifiedTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email,user.name);
        res.status(200).json({success:true,
            message:"Email verified successfully",
            user: {
                ...user._doc,
                password:undefined
            }
        });
    }catch(error){
        console.log("error in verify email",error);
        res.status(400).json({success:false,message:error.message});

    }
}

export const login = async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            // res.status(400).json({success:false,message:"No account exist please signup"});
            return res.redirect('/signup');
        }
        const isPasswordValid = await bcryptjs.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({success:false,message:"Invalid"});
        }
        generateTokenAndSetCookie(res,user._id);
        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({success:true,
            message:"Logged in successfully",
            user: {
                ...user._doc,
                password: undefined
            },
        });
    }catch(error){
        console.log("error in login function",error);
        res.status(400).json({success:false,message:error.message});
    }
    res.send("Signup Route");
}

export const logout = async (req, res) => {
    res.clearCookie("token")
    res.status(200).json({success:true,message:"Logged out successfully"});

}

export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"User not found"});
        }
        //Generate a random reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 60*60*1000; //1 hou r
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;
        await user.save();
        //send email

        await sendResetPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({success:true,message:"Password reset email link sent successfully"});
    }catch(err){
        console.log("error in forgot password",err);
        res.status(400).json({success:false,message:err.message});

    }
    }
        const user = await User

