import { pool } from "../config/db.js";

export const createUser = `CREATE TABLE IF NOT EXISTS users(
id SERIAL PRIMARY KEY,
first_name VARCHAR(100),
last_name VARCHAR(100),
email VARCHAR(255) UNIQUE,
password_hash VARCHAR(100),
role VARCHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

export const createCompany = ` CREATE TABLE IF NOT EXISTS company(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
logo VARCHAR(100),
address VARCHAR(100),
company_size INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

export const createJobSeeker = `CREATE TABLE IF NOT EXISTS job_seeker(
id SERIAL PRIMARY KEY,
users_id INT REFERENCES users(id) ON DELETE CASCADE,
resume VARCHAR(100),
experience VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`

export const createJobListings = `CREATE TABLE IF NOT EXISTS job_listings(
id SERIAL PRIMARY KEY,
employer_id INT REFERENCES users(id) ON DELETE CASCADE,
company_id INT REFERENCES company(id) ON DELETE CASCADE,
title VARCHAR(100),
description VARCHAR(255),
location VARCHAR(255),
salary_min VARCHAR(100),
salary_max VARCHAR(100),
skills_required VARCHAR(100),
experience_level VARCHAR(100),
employment_type VARCHAR(100),
status VARCHAR(100),
view_count INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`

export const createApplication = `CREATE TABLE IF NOT EXISTS application(
id SERIAL PRIMARY KEY,
job_id INT REFERENCES job_listings(id) ON DELETE CASCADE,
seeker_id INT REFERENCES users(id) ON DELETE CASCADE,
cover_letter VARCHAR(255),
resume_url VARCHAR(100),
status VARCHAR(100),
submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`


export const createTables = async () => {

  const client = await pool.connect()

  try {
    await client.query(createUser)
    console.log("User table created")

    await client.query(createCompany)
    console.log("Company table created")

    await client.query(createJobSeeker)
    console.log("Job seeker table created")

    await client.query(createJobListings)
    console.log("Job listings table created")

    await client.query(createApplication)
    console.log("Application table created")

  } catch (error) {
    console.log(error)
  } finally {
    client.release()
  }
}
