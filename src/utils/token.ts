import jwt from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import type { TokenGeneratorType } from "../types/index.ts"
dotenv.config()

export const generateToken = (user_id: TokenGeneratorType, role: TokenGeneratorType) => {

  try {

    const secret = process.env.SECRET_KEY || ""

    const payload = { user_id, role }

    const token = jwt.sign(payload, secret, { expiresIn: "24h" })

    return token

  } catch (error) {
    console.log("Invalid token")
  }
}
