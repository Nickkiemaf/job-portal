import { pool } from "../config/db.ts"

export const companyActiveJobsQuery = `
SELECT * FROM company
WHERE status = active
`

// Update company profile
export const updateCompanyProfileQuery = `
UPDATE company
SET address = COALESCE ($1, address),
company_size = COALESCE ($2, company_size)
WHERE user_id = $3
`

