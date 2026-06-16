import { pool } from "../config/db.ts"
import { allActiveJobsQuery, allJobApplicationsQuery, deleteJobQuery, getSingleJobQuery, updateJobsQuery } from "../model/jobModel.ts"
import { jobListingQuery } from "../model/userModel.ts"
import type { JobType } from "../types/index.ts"

export class jobService {

  static createJobService = async (data: JobType) => {

    const client = await pool.connect()

    try {
      // guide check
      if (data.salary_min < 70000) {
        throw new Error("Minimum salary can't be below minimum wage")
      }

      const jobService = await client.query(jobListingQuery, [
        data.company_id,
        data.title, data.description,
        data.location, data.salary_min,
        data.salary_max, data.skills_required,
        data.experience_level, data.employment_type,
        data.status
      ])

      const newJobService = jobService.rows[0]

      return newJobService

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }

  static allActiveJobsService = async () => {

    const client = await pool.connect()

    try {

      const activeJobss = await client.query(allActiveJobsQuery)

      const aallActiveJobss = activeJobss.rows

      return aallActiveJobss

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }

  static updateJobsService = async (data: JobType) => {

    const client = await pool.connect()

    try {

      const updateJob = await client.query(updateJobsQuery, [
        data.title, data.description,
        data.location, data.salary_min,
        data.salary_max, data.skills_required,
        data.experience_level, data.employment_type,
        data.status, data.company_id
      ])

      const updatedJob = updateJob.rows[0]

      return updatedJob

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }

  static allJobApplicationsService = async (job_id: number) => {

    const client = await pool.connect()

    try {

      const jobApplications = await client.query(allJobApplicationsQuery, [
        job_id
      ])

      if (jobApplications.rows.length === 0) {
        throw new Error("No applications")
      }
      const allJobs = jobApplications.rows[0]

      return allJobs

    } catch (error) {
      console.log(error)
      throw error

    } finally {
      client.release()
    }
  }

  static getSingleJobService = async (job_id: number) => {

    const client = await pool.connect()

    try {

      const getSingleJob = await client.query(getSingleJobQuery, [job_id])

      if (getSingleJob.rows.length === 0) {
        throw new Error("Job not found")
      }

      const getSingleJobss = getSingleJob.rows[0]

      return getSingleJobss

    } catch (error) {
      console.log(error)
      throw error

    } finally {
      client.release()
    }
  }

  static deleteJobService = async (job_id: number) => {

    const client = await pool.connect()

    try {

      const deleted = await client.query(deleteJobQuery, [job_id])

      const deletedJob = deleted.rows[0]

      if (!deletedJob) {
        throw new Error("No job found")
      }

      return deletedJob

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }
}