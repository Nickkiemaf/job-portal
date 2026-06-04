import { pool } from "../config/db.ts"

// Submit an application to a job listing
export const applicationQuery = `
INSERT INTO application(job_id, seeker_id, cover_letter, resume_url)
VALUES($1, $2, $3, $4)
RETURNING *
`

// View all applications by the logged -in seeker
export const viewAllApplicationQuery = `
SELECT * FROM application
WHERE seeker_id = $1
`

// Update application status(employer action)
export const updateJobStatusQuery = `
UPDATE application
SET status = $1
WHERE job_id = $2
RETURNING *
`

//view all application by job_id and seeker_id
export const uniqueJobApplicationQuery = `
SELECT * FROM application
WHERE job_id = $1
AND seeker_id = $2
`
// Withdraw a pending application

