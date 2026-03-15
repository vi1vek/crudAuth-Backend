import express from "express";
import { AdminDeleteAllUserProduct, AllProduct, AllUsersDashboardProduct, AllUsersProduct, DeleteAllUserProduct, DeleteUserProduct, EditUserProduct, UserPost } from "../controllers/postController.js";
import { verifyToken } from "../utility/token/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";

const postRoute = express.Router()

postRoute.post("/",verifyToken,UserPost)
postRoute.get("/",verifyToken,AllProduct)
postRoute.get("/allusers",verifyToken,isAdmin,AllUsersProduct)
postRoute.get("/dashboard",AllUsersDashboardProduct)
postRoute.put("/update/:id",verifyToken,EditUserProduct)
postRoute.delete("/delete/:id",verifyToken,DeleteUserProduct)
postRoute.delete("/alldelete",verifyToken,DeleteAllUserProduct)
postRoute.delete("/admin/",verifyToken,isAdmin,AdminDeleteAllUserProduct)
export default postRoute