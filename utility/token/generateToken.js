import jwt from "jsonwebtoken";

export const GenerateToken = (res,user)=>{
    const token = jwt.sign({id:user._id,name:user.name},process.env.SECRET_KEY,{expiresIn: "1d"})

    res.cookie("token",token,{
        httpOnly:true, // prevent xss attacks
        secure: process.env.NODE_ENV === "production",
        sameSite : "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000, // for 1 days
    })
    return token
}