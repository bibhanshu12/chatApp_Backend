import bcrypt from "bcrypt"
import type { Response } from "express";
export const encrypt=async(data:string,res:Response)=>{


    const genSalt= await bcrypt.genSalt(10);
    const EData= await bcrypt.hash(data,genSalt);
    if(!EData){
        return res.status(400).json({msg:"Encryption failed! "})
    }
    return EData;
}