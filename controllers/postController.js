import Post from "../models/postModel.js"; 

export const UserPost = async(req,res)=>{
    try{
        const{title,price}=req.body;

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

export const AllUsersProduct = async(req,res)=>{
    try{
        
        const existingUser = await Post.find().populate('userId','name')
        if (existingUser.length === 0){
            return res.status(200).json({success:true,message:"No products found for this user",post:existingUser})
        }
        
        return res.status(200).json({success:true,message:"All Users Product fetch successfully.",post:existingUser})
    }catch(error){
        console.error("Post Error:",error)
        return res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}

export const AllUsersDashboardProduct = async(req,res)=>{
    try{
        
        const existingUser = await Post.find()
        if (existingUser.length === 0){
            return res.status(200).json({success:true,message:"No products found for this user",post:existingUser})
        }
        
        return res.status(200).json({success:true,message:"All Users Product fetch successfully.",post:existingUser})
    }catch(error){
        console.error("Post Error:",error)
        return res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}

export const EditUserProduct = async(req,res)=>{
    try{
        const {id}= req.params
        const {title,price} =req.body
        const updateProduct = await Post.findByIdAndUpdate(id,{title,price},{new:true})
        // console.log(updateProduct);
        
        if (!updateProduct){
            return res.status(404).json({success:false,message:"No products found"})
        }
        
        return res.status(200).json({success:true,message:"Product updated successfully.",post:updateProduct})
    }catch(error){
        console.error("Post Error:",error)
        return res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}

export const DeleteUserProduct = async(req,res)=>{
    try{
        const {id}= req.params
        const deleteProduct = await Post.findByIdAndDelete(id)

        
        return res.status(200).json({success:true,message:"Product Deleted successfully.",post:deleteProduct})
    }catch(error){
        console.error("Post Error:",error)
        return res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}

export const DeleteAllUserProduct = async(req,res)=>{
    try{
        const id= req.user.id
        const allDeleteProduct = await Post.deleteMany({userId:id})
        if(allDeleteProduct.deletedCount === 0){
            return res.status(404).json({success:false,message:"No products found to delete."})
        }
        
        return res.status(200).json({success:true,message:"All Product Deleted successfully.",post:allDeleteProduct})
    }catch(error){
        console.error("Post Error:",error)
        return res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}

export const AdminDeleteAllUserProduct = async(req,res)=>{
    try{
        const allDeleteProduct = await Post.deleteMany({})
        if(allDeleteProduct.deletedCount === 0){
            return res.status(404).json({success:false,message:"No products found to delete."})
        }
        
        return res.status(200).json({success:true,message:"All Product Deleted successfully.",post:allDeleteProduct})
    }catch(error){
        console.error("Post Error:",error)
        return res.status(500).json({success:false,message:"Internal server error",err:error.message})
    }
}