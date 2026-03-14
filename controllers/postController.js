import Post from "../models/postModel.js"; 

export const UserPost = async(req,res)=>{
    try{
        const{title,price}=req.body;
        // ! (title price) This All Field Are Required 
        if(!title || !price){
            return res.status(400).json({success:false,message:"All fields required"})
        }  
        const userId= req.user.id
        const newUser= await Post.create({userId:userId,title,price})
        
        return res.status(201).json({success:true,message:"Post created successfully."})
    }catch(error){
        console.error("Post Error:",error)
        return res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}

export const AllProduct = async(req,res)=>{
    try{
        const userId= req.user.id
        const existingUser = await Post.find({userId:userId})
        if (existingUser.length === 0){
            return res.status(200).json({success:true,message:"No products found for this user",post:existingUser})
        }
        
        return res.status(200).json({success:true,message:"Product fetch successfully.",post:existingUser})
    }catch(error){
        console.error("Post Error:",error)
        return res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}