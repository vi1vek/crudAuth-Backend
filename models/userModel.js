import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true //remove accidental whitespace
    },
    email:{
        type: String,
        required:true,
        unique: true,
        lowercase: true, // Ensures "User@Example.com" is stored as "user@example.com"
        trim: true
    },
    password:{
        type: String,
        required:true,
        minlength: 6 //Bsic validation.
    },
    role:{
        type: String,
        emnum: ["user","admin"],
        default: "user"   
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verficationCode:{
        type: String
    },
    verficationCodeExpiresAt:{
        type: Date,
    },
    resetPasswordCode:String,
    resetPasswordExpiresAt: Date,
    lastLogin:{
        type:Date,
        default: Date.now
    }
},{
    timestamps:true
})

const User = mongoose.model("User",userSchema);
export default User