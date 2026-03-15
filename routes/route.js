import express from "express";
import { GetAllUser, logout, Register, resendVerificationCode, resetPassword, resetPasswordCode, Signin, UserId, verifyEmail } from "../controllers/userController.js";
import { verifyToken } from "../utility/token/verifyToken.js";
import {isAdmin} from "../middleware/isAdmin.js"
const userRoute = express.Router()

userRoute.post("/signup",Register)
userRoute.post('/verify',verifyEmail)
userRoute.post('/resend',resendVerificationCode)
userRoute.get('/getallusers',verifyToken,isAdmin,GetAllUser)
userRoute.post('/signin',Signin)
userRoute.post('/logout',logout)
userRoute.get('/getId',verifyToken,UserId)
userRoute.post('/resetcode',resetPasswordCode)
userRoute.post('/resetpassword',resetPassword)
export default userRoute