import express, { type Application } from "express"
import dotenv from "dotenv"
import { testDatabase } from "./config/db.ts"
import { runMigration } from "../scripts/migration.ts"
import { emailService } from "./utils/email.ts"
import { logger } from "./utils/logger.ts"
import authRoute from "./route/jobPortal.ts"


dotenv.config()

const app: Application = express()

//const port: string | undefined = process.env.PORT

app.use(express.json())

app.use(authRoute)

app.listen(3000, () => {
  console.log(`Server is running on 8080`)

  testDatabase()
  //runMigration()
  emailService.sendCompanyWelcome("mikailajibolawrites@gmail.com", "Ferricool Studio")
  logger.info("Server runnung.")
})