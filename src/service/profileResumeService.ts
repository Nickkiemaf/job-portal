import { pool } from "../config/db.ts"

export class profileService {

  static jobSeekerProfileService = async () => {

    const client = await pool.connect()
  }
}



// View logged -in seeker profile
// Update seeker profile(skills, bio, experience)
// Upload resume PDF(multipart / form - data)
// View a seeker profile(for employer access)
