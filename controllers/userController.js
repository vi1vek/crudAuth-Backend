import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import { sendVerificationCode, welcomeEmail } from "../utility/email.js";
import { GenerateToken } from "../utility/token/generateToken.js";
// ! This for newUser Register 
export const Register = async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        const {role} = req.body
        // ! (Name Emal Password ) This All Field Are Required 
        if(!name || !email || !password){
            return res.status(400).json({success:false,message:"All fields required"})
        }  

        // ! email format
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if(!emailRegex.test(email)){
        //     return res.status(400).json({success:false,message:"Invalid email format"})
        // }
        // ! Check if user is already present in mongodb or not 
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({success:false,message:"User Allready exist. Please Login"})
        }
        // ! bcrypt is use to hash password
        const hashPass = await bcrypt.hash(password,12)
        // ! Create otp by using math.random
        const verficationCode = Math.floor(100000 + Math.random() * 900000).toString()

        const verficationCodeExpiresAt = Date.now() + 15 * 60 * 1000; // for 1 min
        // ! Create a new user
        const newUser= await User.create({name,email,password:hashPass,role,verficationCode,verficationCodeExpiresAt})
        
        // ! Send verification code to email you use to register
        await sendVerificationCode(newUser)
        return res.status(201).json({success:true,message:"User Register successfully. Please verify your email."})
    }catch(error){
        console.error("Register Error:",error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

// ! This is for verify your email
export const verifyEmail = async(req,res)=>{
    try{
        const {code}=req.body
        // !
        const findUser = await User.findOne({verficationCode:code,verficationCodeExpiresAt:{$gt: Date.now()}})
        
        
        if(!findUser){
            return res.status(400).json({success:false,message:"Invalid or Expired verification Code"})
        }
        
        findUser.isVerified = true
        findUser.verficationCode = undefined
        findUser.verficationCodeExpiresAt = undefined
        
        await findUser.save()
        // 
        console.log(findUser);
        await welcomeEmail(findUser.email,findUser.name)
        return res.status(200).json({success:true,message:"Email Verified successfully.."})
    }catch(error){
        return res.status(500).json({success:false,message:"server error during verification."})
    }
}
// ! if otp expired.
export const resendVerificationCode = async(req,res)=>{
    try{
        const {email}=req.body
        // !
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({success:false,message:"Email is not registered. First Signup."})
        }
        if(user.isVerified){
            return res.status(400).json({success:false,message:"Account is already verified"})
        }

        const newCode = Math.floor(100000 + Math.random() * 900000).toString()
        user.verficationCode = newCode
        user.verficationCodeExpiresAt = Date.now() + 15 * 60 * 1000;
        await user.save()
        await sendVerificationCode(user)
        return res.status(200).json({success:true,message:"A new verification code has been sent to your registered email"})
    }catch(error){
        console.error("Resend Verification Code:",error)
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}
// ! for login user
export const Signin = async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({success:false,message:"All fields required"})
        }
        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({success:false,message:"User Not Found. Please Signup First"})
        }
        if(!existingUser.isVerified){
            return res.status(400).json({success:false,message:"First Verify Your Otp"})
        }
        const isMatched = await bcrypt.compare(password,existingUser.password)
        if(!isMatched){
            return res.status(400).json({success:false,message:"Invalid Credintials"})
        }
        
        const token = GenerateToken(res,existingUser)
        await existingUser.save();
        
        return res.status(200).json({success:true,message:"User Login successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}
// ! for logout user
export const logout = (req,res)=>{
    try{
        res.clearCookie("token")
        res.status(200).json({success:true,message:"Logout successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:"internal server error",err:error.message})
    }
    
}

export const GetAllUser = async(req,res)=>{
    try{
        const existingUser = await User.find()
        
        return res.status(200).json({success:true,message:"Product fetch successfully.",user:existingUser})
    }catch(error){
        console.error("Post Error:",error)
        return res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}
