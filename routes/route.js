import express from "express";
import { GetAllUser, logout, Register, resendVerificationCode, Signin, verifyEmail } from "../controllers/userController.js";
import { verifyToken } from "../utility/token/verifyToken.js";
import {isAdmin} from "../middleware/isAdmin.js"
const userRoute = express.Router()

userRoute.post("/signup",Register)
userRoute.post('/verify',verifyEmail)
userRoute.post('/resend',resendVerificationCode)
userRoute.post('/getallusers',verifyToken,isAdmin,GetAllUser)
userRoute.post('/signin',Signin)
userRoute.post('/logout',logout)
export default userRoute