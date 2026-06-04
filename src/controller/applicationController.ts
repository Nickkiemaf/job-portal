import type { Request, Response } from "express"
import { applicationService } from "../service/applicationService.ts"

export class newApplication {

  static userApplication = async (req: Request, res: Response) => {

    try {

      const { job_id, seeker_id, cover_letter, resume_url } = req.body

      if (!job_id || !seeker_id || !cover_letter || !resume_url) {
        return res.status(400).json({
          message: "All fields required"
        })
      }

      const newUserApplication = await applicationService.userApplicationService({
        job_id, seeker_id, cover_letter, resume_url
      })

      return res.status(201).json({
        data: newUserApplication
      })

    } catch (error: any) {

      if (error === "Only one application allowed") {
        return res.status(409).json({
          message: "You have already applied for this job"
        })
      }

      return res.status(500).json({
        message: "Internal Server error"
      })
    }

  }

  static allUserApplication = async (req: Request, res: Response) => {

    try {

      const { seeker_id } = req.body

      if (!seeker_id) {
        return res.status(400).json({
          message: "Id required"
        })
      }

      const allUserApplicationss = await applicationService.allUserApplicationService(seeker_id)

      return res.status(200).json({
        data: allUserApplicationss
      })

    } catch (error) {
      console.log(error)
    }
  }

  static updateApplicationByStatus = async (req: Request, res: Response) => {

    try {

      const { id } = req.params as { id: string }
      const job_id = parseInt(id)

      const { status } = req.body

      if (!job_id || !status) {
        return res.status(400).json({
          message: "All fields required"
        })
      }

      const updateApplication = await applicationService.updateApplicationByStatusService(status, job_id)

      return res.status(200).json({
        data: updateApplication
      })
    } catch (error) {
      console.log(error || "Internal Server Error")
    }
  }


}