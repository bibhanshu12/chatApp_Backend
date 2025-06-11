import express from "express";
import env from "dotenv";

env.config();


const app= express();

app.get('/',(req,res)=>{
    res.status(200).send("Data working fine!! ")
})


app.listen(3000,()=>{
    console.log("Server is Listening on Port: 3000");
})



console.log("Hello via Bun!");