import type { Response } from "express";
import jwt from "jsonwebtoken";


export const generateToken=async(userId:any, res:Response)=>{

    const token = jwt.sign(userId,process.env.JWT_SECRET as string,{
      expiresIn: "1d", 
    });

    
    res.cookie("jwt",token,{
      maxAge:1*1000*60*60*24,  //1 days
      httpOnly:true,
      secure: process.env.NODE_ENV!="Development",
      sameSite:"none"
    })

    return token;

}