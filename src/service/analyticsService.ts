import { pool } from "../config/db.ts"
import { applicationCountQuery, jobListingViewsQuery, statusPerListingQuery, totalActiveJobsQuery } from "../model/analyticsModel.ts"

// Summary dashboard for the logged -in employer
// Metrics for a specific job listing

export class analyticsService {

  static summaryDashboardAnalyticsService = async (company_id: number) => {

    const client = await pool.connect()

    try {

      const totalActiveJobs = await client.query(totalActiveJobsQuery, [
        company_id
      ])

      const active = totalActiveJobs.rows

      return active

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }

  static specificJobListingAnalyticService = async (job_id: number) => {

    const client = await pool.connect()

    try {

      //total views per job listing
      const jobListingCount = await client.query(jobListingViewsQuery, [job_id])
      const jobCount = jobListingCount.rows

      //total application count
      const totalApplicationCount = await client.query(applicationCountQuery, [job_id])
      const applicationCount = totalApplicationCount.rows

      //count per status
      const statusPerListingCount = await client.query(statusPerListingQuery, [job_id])
      const perListingCount = statusPerListingCount.rows

      return {
        jobCount, applicationCount, perListingCount
      }

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }
} 