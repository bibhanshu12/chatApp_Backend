import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    fullname:{
        type:String,
        require:true,

    },
    email:{
        require:true,
        type:String,
    },
    password:{
        require:true,
        type:String,
    },
    profile:{
        type:String,
        require:false,
        default:""
    }
})

export const userModel = mongoose.model("User",userSchema);
