import express from "express";
import env from "dotenv";
import {router} from "./routes/auth.route.ts"

env.config();



const app= express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v0",router);

app.get('/',(req,res)=>{
    res.status(200).send("Data working fine!! ")
})


app.listen(3000,()=>{
    console.log("Server is Listening on Port: 3000");
})



console.log("Hello via Bun!");