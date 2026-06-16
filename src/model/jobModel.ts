import { pool } from "../config/db.ts"

export const allActiveJobsQuery = `
SELECT * FROM job_listings
WHERE status = 'active'
AND is_deleted = false
`

export const updateJobsQuery = `
UPDATE job_listings
SET title = COALESCE ($1, title),
description = COALESCE ($2, description), 
location = COALESCE ($3, location), 
salary_min = COALESCE ($4, salary_min), 
salary_max = COALESCE ($5, salary_max),
skills_required = COALESCE ($6, skills_required), 
experience_level = COALESCE ($7, experience_level), 
employment_type = COALESCE ($8, employment_type),
status = COALESCE ($9, status)
WHERE company_id = $10
RETURNING *
`

export const allJobApplicationsQuery = `
SELECT *
FROM application
WHERE job_id = $1
`

export const getSingleJobQuery = `
UPDATE job_listings
SET view_count = view_count + 1
WHERE id = $1
AND is_deleted = false
RETURNING *
`

export const deleteJobQuery = `
UPDATE job_listings
SET is_deleted = TRUE
WHERE id = $1
RETURNING *
`