import type { Request, Response } from "express"
import { analyticsService } from "../service/analyticsService.ts"

export class analytics {

  static summaryDashboardAnalytics = async (req: Request, res: Response) => {

    try {

      const { company_id } = req.body

      const summary = await analyticsService.summaryDashboardAnalyticsService(company_id)

      return res.status(200).json({
        data: summary
      })

    } catch (error) {
      console.log(error || "Internal server error")
    }
  }


  static specificJobListingAnalytics = async (req: Request, res: Response) => {

    try {

      const { id } = req.params as { id: string }

      const job_id = parseInt(id)

      const specific = await analyticsService.specificJobListingAnalyticService(job_id)

      return res.status(200).json({
        data: specific
      })

    } catch (error) {
      console.log(error || "Internal server error")
    }
  }
}