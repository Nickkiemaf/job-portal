import { pool } from "../config/db.ts"
import { applicationQuery, uniqueJobApplicationQuery, updateJobStatusQuery, viewAllApplicationQuery } from "../model/applicationModel.ts"
import type { ApplicationType } from "../types/index.ts"

export class applicationService {

  static userApplicationService = async (data: ApplicationType) => {

    const client = await pool.connect()

    try {
      //prevent duplicate application
      const preventDoubleApplication = await client.query(uniqueJobApplicationQuery, [
        data.job_id,
        data.seeker_id
      ])

      if (preventDoubleApplication.rows.length > 0) {
        throw new Error("Only one application allowed")
      }

      //insertion
      const jobApplication = await client.query(applicationQuery, [
        data.job_id,
        data.seeker_id,
        data.cover_letter,
        data.resume_url
      ])

      const newApplication = jobApplication.rows[0]

      return newApplication

    } catch (error) {
      console.log(error)
      throw error

    } finally {
      client.release()
    }
  }

  // View all applications (by status) by the logged -in seeker
  static allUserApplicationService = async (seeker_id: number) => {

    const client = await pool.connect()

    try {

      const allUserApp = await client.query(viewAllApplicationQuery, [seeker_id])

      const allApplications = allUserApp.rows[0]

      return allApplications

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }

  // Update application status(employer action)
  static updateApplicationByStatusService = async (status: string, job_id: number) => {

    const client = await pool.connect()

    try {

      const update = await client.query(updateJobStatusQuery, [
        status,
        job_id
      ])

      const updateJobStatus = update.rows[0]

      return updateJobStatus

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }
}



// Withdraw a pending application
