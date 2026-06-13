import { pool } from "../config/db.ts"

//Total views per job listing, Increment counter on each GET / jobs /: id
export const jobListingViewsQuery = `
SELECT view_count
FROM job_listings
WHERE id = $1
`

// Total applications per job listing, Count from applications table
export const applicationCountQuery = `
SELECT COUNT (*)
FROM application
WHERE job_id = $1
`

// Application conversion rate per listing(apps / views), Computed field in response


// Applications breakdown by status per listing, Group by status field
//'pending', 'reviewed', 'interview', 'rejected', 'hired'

export const statusPerListingQuery = `
SELECT COUNT (*)
FROM application
WHERE job_id = $1
GROUP BY status
`

// Summary: total active listings for the employer, Single employer dashboard
export const totalActiveJobsQuery = `
SELECT COUNT (*)
FROM job_listings
WHERE status = 'active'
AND company_id = $1
`
