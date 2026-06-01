import type { Request, Response } from "express"
import { authService } from "../service/authService.ts"


export class auth {

  static userSignup = async (req: Request, res: Response) => {

    try {

      const { first_name, last_name, email, password, role, resume,
        experience, logo, address, company_size
      } = req.body

      //validation

      if (!first_name || !last_name || !email || !password || !role) {
        return res.status(200).json({
          message: "All fields required"
        })
      }

      if (password.length < 8) {
        return res.status(400).json({
          message: "Password must be longer than 8 digits"
        })
      }

      let result

      if (role == "Job_seeker") {
        result = await authService.jobSeekerSignup(
          { first_name, last_name, email, password, role, resume, experience })
      }

      else if (role == "Company") {
        result = await authService.companySignup(
          { first_name, last_name, email, password, role, logo, address, company_size }
        )
      }

      else {
        return res.status(400).json({
          message: "Hunting a job or finding a talent?"
        })
      }

      return res.status(200).json({
        message: "User created",
        data: result
      })

    } catch (error) {
      console.log(error)
    }
  }

  static userLogin = async (req: Request, res: Response) => {

    try {

      const { email, password } = req.body

      //validation
      if (!email || !password) {
        return res.status(400).json({
          message: "All fields required"
        })
      }
      const result = await authService.login({ email, password })

      return res.status(200).json({
        message: "Welcome",
        data: result
      })

    } catch (error) {
      console.log(error)
    }

  }


}

//auth.userSignup()