import express from "express";
import { login, logout, signup } from "../controller/Auth.Controller.ts";
import  { catchAsync } from "../utils/catchAsync.util.ts";

export const router= express.Router();


router.post("/signup",catchAsync(signup));
router.post("/login",catchAsync(login));
router.post("/logout",logout);