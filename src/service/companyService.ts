import { cli } from "winston/lib/winston/config/index.js"
import { pool } from "../config/db.ts"
import { companyActiveJobsQuery, updateCompanyProfileQuery } from "../model/companyModel.ts"
import { companyQuery } from "../model/userModel.ts"
import type { CompanyType } from "../types/index.ts"

export class companyService {

  // View a public company profile with active jobs
  static activeJobsService = async () => {

    const client = await pool.connect()

    try {

      const activeJobs = await client.query(companyActiveJobsQuery)

      const allActiveJobs = activeJobs.rows[0]

      return allActiveJobs

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }

  // Update company profile

  static updateCompanyProfileService = async (data: CompanyType) => {

    const client = await pool.connect()

    try {

      const updateCompanyProfile = await client.query(updateCompanyProfileQuery, [
        data.address,
        data.company_size,
        data.user_id
      ])

      const companyProfile = updateCompanyProfile.rows[0]

      return companyProfile

    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }

}


// Upload company logo image
