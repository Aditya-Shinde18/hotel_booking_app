import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/verifyToken.js";

export const register = async (req,res,next)=>{   
    try{
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(req.body.password, salt)

     const newUser= new User({
        ...req.body,
        password: hash,
     })
     await newUser.save();
     res.status(200).send("user has been created")
    }catch(error){
        next(error)
    }
}


export const login = async (req,res,next)=>{
    try{
    const user = await User.findOne({username:req.body.username})
    if(!user) return next(createError(404,"User Not Found"))

    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password)
    if(!isPasswordCorrect) return next(createError(400,"Details Not Found"))

    const token= jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)

    const {password,isAdmin,...otherDetails} = user._doc;
    
     res.cookie("access_token",token,{httpOnly:true}).status(200).json({details:{...otherDetails},isAdmin})
    }catch(error){
        next(error)
    }
}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"you are not authorized"))
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"you are not authorized"))
        }
    })
}