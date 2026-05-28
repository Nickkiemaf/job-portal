import type { Request, Response } from "express";
import { jobService } from "../service/jobService.ts";

export class job {

  static createJob = async (req: Request, res: Response) => {

    try {

      const { employer_id, company_id, title,
        description, location, salary_min, salary_max,
        skills_required, experience_level, employment_type,
        status, view_count
      } = req.body

      //validation

      if (!employer_id || !company_id || !title ||
        !description || !location || !salary_min || !salary_max ||
        !skills_required || !experience_level || !employment_type ||
        !status || !view_count) {
        return res.status(400).json({
          message: "All fields required"
        })
      }

      const newJob = await jobService.createJobService({
        employer_id, company_id, title,
        description, location, salary_min, salary_max,
        skills_required, experience_level, employment_type,
        status, view_count
      })

      return res.status(201).json({
        message: "New job posted"
      })

    } catch (error) {
      console.log(error)
    }
  }

  static allActiveJobs = async (req: Request, res: Response) => {

    try {

      const activeJobs = await jobService.allActiveJobsService()

      return res.status(200).json({
        data: activeJobs
      })


    } catch (error) {
      console.log(error)
    }
  }


  static updateJobs = async (req: Request, res: Response) => {

    try {
      const { employer_id, company_id, title,
        description, location, salary_min, salary_max,
        skills_required, experience_level, employment_type,
        status, view_count
      } = req.body


      if (!employer_id) {
        return res.status(400).json({
          message: "Employer id required"
        })
      }

      const updateJobListing = await jobService.updateJobsService({
        employer_id, company_id, title,
        description, location, salary_min, salary_max,
        skills_required, experience_level, employment_type,
        status, view_count
      })

      return res.status(200).json({
        message: "Job updated",
        data: updateJobListing
      })

    } catch (error) {
      console.log(error)
    }
  }

  static allJobApplications = async (req: Request, res: Response) => {

    try {

      const { job_id } = req.body

      if (!job_id) {
        return res.status(400).json({
          message: "Job_id required"
        })
      }

      const allJobApplications = await jobService.allJobApplicationsService(job_id)

      return res.status(200).json({
        data: allJobApplications
      })

    } catch (error) {
      console.log(error)
    }
  }

  static getSingleJob = async (req: Request, res: Response) => {

    try {

      const { id } = req.params as { id: string }

      if (!id) {
        return res.status(400).json({
          message: "Id required"
        })
      }

      const job_id = parseInt(id)


      const singleJob = await jobService.getSingleJobService(job_id)

      return res.status(200).json({
        data: singleJob
      })

    } catch (error) {
      console.log(error)
    }
  }

}