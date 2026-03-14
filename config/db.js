import mongoose from "mongoose";

const connectDb = ()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL);
        console.log("Connection sucessfully");
        
    }catch(error){
        console.log("Connection failed!");
        
    }
}

export default connectDb