import express from "express";
import { AllProduct, UserPost } from "../controllers/postController.js";
import { verifyToken } from "../utility/token/verifyToken.js";

const postRoute = express.Router()

postRoute.post("/",verifyToken,UserPost)
postRoute.get("/",verifyToken,AllProduct)

export default postRoute