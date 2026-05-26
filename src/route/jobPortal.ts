import { Router } from "express";
import { auth } from "../controller/authController.ts";

const router = Router()

router.post("/signup", auth.userSignup)
router.post("/login", auth.userLogin)

export default router

