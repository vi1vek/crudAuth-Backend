import jwt from "jsonwebtoken"
import User from "../../models/userModel.js";

export const verifyToken = async(req,res,next)=>{
    const token = req.cookies.token
    // console.log(token);
    
    if(!token){
        return res.status(401).json({success: false,message:"Unauthorized Login First"})
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY)

        // ! check user still exist in the db
        const userExists = await User.findById(decoded.id)
        if(!userExists){
            // ! if user was deleted ,clear invalid cookie and block the request
            res.clearCookie("token")
            return res.status(404).json({success:false,message:"User no longer exists."})
        }
        
        req.user = decoded
        next()
    }catch(error){
        return res.status(403).json({success:false,message:"Invalid or expired token",err:error.message})
    }
}