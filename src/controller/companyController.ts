import type { Request, Response } from "express";
import { companyService } from "../service/companyService.ts";

export class company {

  static activeJobs = async (req: Request, res: Response) => {

    try {

      const activeJobbs = await companyService.activeJobsService()

      return res.status(200).json({
        data: activeJobbs
      })

    } catch (error) {
      console.log(error || "Internal server error")
    }
  }

  static updateCompanyProfile = async (req: Request, res: Response) => {

    try {

      const { address, company_size, user_id } = req.body

      if (!address || !company_size || !user_id) {
        return res.status(400).json({
          message: "All fields required"
        })
      }

      const profile = await companyService.updateCompanyProfileService({
        address, company_size, user_id
      })
    } catch (error) {
      console.log(error || "Internal server error")
    }
  }
}