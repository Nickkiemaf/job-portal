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
UPDATE application a
SET status = $1, 
updated_at = CURRENT_TIMESTAMP
FROM users u
WHERE a.job_id = $2
AND a.seeker_id = u.id
RETURNING a.*, u.email, u.first_name
`

//view all application by job_id and seeker_id
export const uniqueJobApplicationQuery = `
SELECT * FROM application
WHERE job_id = $1
AND seeker_id = $2
`
// Withdraw a pending application
export const withdrawApplicationQuery = `
DELETE FROM application
WHERE id = $1
AND status = 'pending'
RETURNING *
`
