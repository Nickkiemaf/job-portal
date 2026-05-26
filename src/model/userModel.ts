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
INSERT INTO job_listings (employer_id, company_id, title, description,
location, salary_min, salary_max, skills_required, experience_level,
employment_type, status, view_count)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
RETURNING *
`

export const applicationQuery = `
INSERT INTO application(job_id, seeker_id, cover_letter, resume_url, status)
VALUES($1, $2, $3, $4, $5)
RETURNING *
`

export const emailExist = `
SELECT * FROM users
WHERE email = $1
`