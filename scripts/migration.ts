import { pool } from "../src/config/db.js";
import { createTables } from "../src/model/createTable.js";


export const runMigration = async () => {

  try {
    await createTables()
    await pool.end()

    console.log("Migration successful")

  } catch (error) {
    console.log(error)

  } finally {
    process.exit(0)
  }
}

//runMigration()