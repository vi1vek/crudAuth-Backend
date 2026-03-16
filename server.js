import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv"
import userRoute from "./routes/route.js";
import cors from 'cors'
import postRoute from "./routes/postRoute.js";
import cookieParser from "cookie-parser";
dotenv.config()
const app = express()
// app.use(express.static('dist'))
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/user',userRoute)
app.use('/api/post',postRoute)

const PORT = process.env.PORT || 8000

// app.get('/',(req,res)=>{
//     return res.sendFile('index.html')
// })

app.listen(PORT,()=>{
    connectDb()
    console.log(`Server is running at port http://localhost:${PORT}`);
    
})

