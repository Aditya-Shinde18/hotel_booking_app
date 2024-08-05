import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";
import { verifyAdmin, verifyUser } from "../controllers/auth.js";

const router = express.Router()

router.get("/checkauthentication",verifyToken,(req,res,next)=>{
    res.send("hello user.you are logged in ")
})

router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
    res.send("hello user.you are logged in and delete your account ")
})

router.get("/checkadmin/:id",verifyAdmin,(req,res,next)=>{
    res.send("hello Admin.you are logged in and delete your All account")
})

router.put("/:id",verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/",verifyAdmin, getAllUser);

export default router