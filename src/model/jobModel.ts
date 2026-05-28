import { pool } from "../config/db.ts"

// export const createJobModel = `
// INSERT INTO job_listings(employer_id, company_id, title, description, location,
// salary_min, salary_max, skills_required, experience_level, employment_type,
// status, view_count)
// VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
// RETURNING *
// `

export const allActiveJobsQuery = `
SELECT *
WHERE status = active
`

export const updateJobsQuery = `
UPDATE job_listings
SET company_id = COALESCE ($1, company_id),
title = COALESCE ($2, title),
description = COALESCE ($3, description), 
location = COALESCE ($4, location), 
salary_min = COALESCE ($5, salary_min), 
salary_max = COALESCE ($6, salary_max),
skills_required = COALESCE ($7, skills_required), 
experience_level = COALESCE ($8, experience_level), 
employment_type = COALESCE ($9, employment_type),
status = COALESCE ($10, status), 
view_count = COALESCE ($11, view_count)
WHERE employer_id = $12
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
RETURNING *
`

