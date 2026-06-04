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
export const enumm = `DO $$ BEGIN
CREATE TYPE job_status 
AS ENUM ('draft', 'active', 'closed');
EXCEPTION WHEN duplicate_object THEN null;
END $$
`

export const enumms = `DO $$ BEGIN
CREATE TYPE application_status
AS ENUM ('pending', 'reviewed', 'interview', 'rejected', 'hired');
EXCEPTION WHEN duplicate_object THEN null;
END $$
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
company_id INT REFERENCES company(id) ON DELETE CASCADE,
title VARCHAR(100),
description VARCHAR(255),
location VARCHAR(255),
salary_min INT,
salary_max INT,
skills_required VARCHAR(100),
experience_level VARCHAR(100),
employment_type VARCHAR(100),
status VARCHAR(100),
view_count INT DEFAULT 0,
is_deleted BOOLEAN DEFAULT false,
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
export const alterTable = `ALTER TABLE job_listings
ALTER COLUMN status TYPE job_status
USING status::job_status
`

export const alterTableTwo = `ALTER TABLE application
ALTER COLUMN status TYPE application_status
USING status::application_status
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

    await client.query(enumm)
    console.log("job status data type")

    await client.query(alterTable)
    console.log("Table altered")

    await client.query(enumms)
    console.log("application status data type")

    await client.query(alterTableTwo)
    console.log("Application table altered")



  } catch (error) {
    console.log(error)
  } finally {
    client.release()
  }
}
