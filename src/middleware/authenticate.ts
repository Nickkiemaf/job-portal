import type { Request, Response, NextFunction } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

interface AuthRequest extends Request {
  user?: string | JwtPayload
}


export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {

  const secret = process.env.SECRET_KEY || ""

  try {

    const authorization = req.headers.authorization

    //validate token

    if (!authorization || !authorization.startsWith("Bearer")) {
      return res.status(400).json({
        message: "authorization required"
      })
    }

    //decode token
    const token = authorization.split(" ")[1] || ""
    const decodeToken = jwt.verify(token, secret)

    //store token
    req.user = decodeToken

    next()

  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: "Invalid token or expired token" })
  }
}