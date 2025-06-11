import { userModel } from "../models/userModel.ts";
import { Login, Signup } from "../validation/index.ts";
import { ApiError } from "../utils/apiError.util.ts";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { encrypt } from "../utils/crypt.util.ts";
import type { Document, InferSchemaType } from "mongoose";
import { generateToken } from "../utils/generateToken.util.ts";

type UserDocument = Document & InferSchemaType<typeof userModel.schema>;

export const signup=async(req:Request,res:Response)=>{

  try{
      const data=Signup.safeParse(req.body);

    if(!data.data){
        throw new ApiError(400,"Required All Fields");
    }
    
    const fuser= await userModel.findOne({email:data.data?.email});
    if(fuser){
       return res.status(202).json({msg:"User already found!. Please Login"}); 
    }


        //Encrypt password

        const hassedPassword=encrypt(data.data.password,res);
    // const saltround=await bcrypt.genSalt(10);
    // const hassedPassword= await bcrypt.hash(data.data?.password,saltround);


    const user = await userModel.create({
        fullName:data.data?.fullName,
        email:data.data?.email,
        password:hassedPassword
    }) as UserDocument;

   
     if (!user) {
      return res.status(400).json({ user: "Error while saving new User. " });
    } 
       const Ruser= await userModel.findById(user._id).select('-password');

   return res.status(400).json({data:Ruser});

  }catch(err:any){
    return res.status(400).json({msg:"Got an Error",err:err.message})
  }
    

}


export const login=async(req:Request,res:Response)=>{

  try{
      const data=Login.safeParse(req.body);

    if(!data.data){
        throw new ApiError(400,"Required All Fields");
    }
    
    const fuser= await userModel.findOne({email:data.data?.email});
    if(!fuser){
       return res.status(202).json({msg:"User not found!. Please Signup"}); 
    }
    const token = generateToken(fuser._id,res);
       const Ruser= await userModel.findById(fuser._id).select('-password');

   return res.status(400).json({data:Ruser,token:token});

  }catch(err:any){
    return res.status(400).json({msg:"Got an Error",err:err.message})
  }
    

}

export const logout=async(req:Request,res:Response)=>{
    res.cookie('jwt',"",{maxAge:0})
    res.status(200).json({data:"Logout Successfully!"});
}