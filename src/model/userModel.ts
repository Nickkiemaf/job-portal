import { pool } from "../config/db.ts"

export const usersQuery = `
INSERT INTO users(first_name, last_name, email, password_hash, role)
VALUES ($1, $2, $3, $4, $5)
RETURNING *
`

export const jobSeekerQuery = `
INSERT INTO job_seeker (users_id, resume, experience)
VALUES ($1, $2, $3)
RETURNING *
`

export const companyQuery = `
INSERT INTO company (user_id, logo, address, company_size)
VALUES ($1, $2, $3, $4)
RETURNING *
`

export const jobListingQuery = `
INSERT INTO job_listings (company_id, title, description,
location, salary_min, salary_max, skills_required, experience_level,
employment_type, status)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
RETURNING *
`


export const emailExist = `
SELECT * FROM users
WHERE email = $1
`

export const comparePasswordQuery = `
SELECT password_hash
FROM users
WHERE email = $1
`

export const passwordResetQuery = `
UPDATE users
SET password_hash = COALESCE($1, password_hash)
WHERE email = $2
RETURNING *
`