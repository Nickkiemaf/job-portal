import type { Request, Response, NextFunction } from "express"

export const permissions = (requiredRole: string[]) => {

  return (req: Request, res: Response, next: NextFunction) => {
    try {

      //grab role from headers
      const role = req.headers.user as string
      console.log(role)

      //verfiry role from headers
      if (!role) {
        return res.status(401).json({
          message: "Unauthorized access"
        })
      }

      //verify user role exists
      if (!requiredRole.includes(role)) {
        return res.status(401).json({
          message: "Unathourized access"
        })
      }

      next()

    } catch (error) {
      console.log("Unathourized access.")
    }
  }

}