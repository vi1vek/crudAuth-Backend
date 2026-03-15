import User from "../models/userModel.js"

export const isAdmin = async(req,res,next)=>{
    
    const id = req.user.id
    try{
        const user =await User.findById(id)
        const role = user.role
        if(role==="user"){
            return res.status(404).json({message:"Access Denied. Admin only. "})
        }else{
            // req.admin.id = id
            next()
        }
        
    }catch(error){
        return res.status(500).json({success:false,message:"Internal Server Error.",err:error.message})
    }
    
    
    
}