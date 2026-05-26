import { Pool } from "pg";
import dotenv from "dotenv"
dotenv.config()

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT)
})

export const testDatabase = async () => {

  try {
    const query = await pool.query(`SELECT NOW()`)
    console.log("db connected ", query.rows[0])
  } catch (error) {
    console.log(error)
  }
}




