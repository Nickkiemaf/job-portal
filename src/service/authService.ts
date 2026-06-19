import bcrypt from "bcryptjs"
import { pool } from "../config/db.ts"
import { companyQuery, comparePasswordQuery, emailExist, jobSeekerQuery, passwordResetQuery, usersQuery } from "../model/userModel.ts"
import type { SignupUser, User } from "../types/index.ts"
import { generateToken } from "../utils/token.ts"

export class authService {

  static jobSeekerSignup = async (data: User) => {

    const client = await pool.connect()
    try {

      //validation
      const emailExistence = await client.query(emailExist, [data.email])

      if (emailExistence.rows.length > 0) {
        throw new Error("user already exists")
      }

      //password hashing
      const hashedPassword = await bcrypt.hash(data.password, 10)

      //rollback
      await client.query("BEGIN")

      const userResult = await client.query(usersQuery, [
        data.first_name,
        data.last_name,
        data.email,
        hashedPassword,
        data.role
      ])
      const userResults = userResult.rows[0]

      const jobSeekerResult = await client.query(jobSeekerQuery, [
        data.users_id,
        data.resume,
        data.experience
      ])
      const jobSeekerResults = jobSeekerResult.rows[0]

      client.query("COMMIT")

      return {
        userResults, jobSeekerResults
      }


    } catch (error) {
      client.query("ROLLBACK")
      console.log(error)
      throw error

    } finally {
      client.release()
    }

  }

  static companySignup = async (data: User) => {

    const client = await pool.connect()

    try {

      //validation
      const emailExistence = await client.query(emailExist, [data.email])

      if (emailExistence.rows.length > 0) {
        throw new Error("user already exists")
      }

      //password hashing
      const hashedPassword = await bcrypt.hash(data.password, 10)

      //rollback

      client.query("BEGIN")

      const userResult = await client.query(usersQuery, [
        data.first_name,
        data.last_name,
        data.email,
        hashedPassword,
        data.role
      ])
      const userResults = userResult.rows[0]

      const companyResult = await client.query(companyQuery, [
        userResults.id,
        data.logo,
        data.address,
        data.company_size
      ])
      const companyResults = companyResult.rows[0]

      client.query("COMMIT")

      return {
        userResults, companyResults
      }

    } catch (error) {
      client.query("ROLLBACK")
      console.log(error)
      throw error

    } finally {
      client.release()
    }

  }

  static login = async (data: SignupUser) => {

    const client = await pool.connect()

    try {

      //validation
      const emailExistences = await client.query(emailExist, [
        data.email
      ])

      if (emailExistences.rows.length === 0) {
        throw new Error("User not found")
      }

      const userData = emailExistences.rows[0]

      //password match?
      const passwordMatch = await bcrypt.compare(data.password, userData.password_hash)

      if (!passwordMatch) {
        throw new Error("Incorrect information. Try again")
      }

      const token = await generateToken(userData.id, userData.role)

      const { password_hash, ...datas } = userData

      return { datas, token }


    } catch (error) {
      console.log(error)

    } finally {
      client.release()
    }
  }

  static passwordReset = async (email: string, password_hash: string, new_password: string) => {

    const client = await pool.connect()

    try {

      //grab user password
      const password = await client.query(comparePasswordQuery, [email])

      const comparePassword = password.rows[0]
      //compare query output with user input
      const passowrdMatch = await bcrypt.compare(password_hash, comparePassword.password_hash)

      //check if password match
      if (!passowrdMatch) {
        throw new Error("Incorrect old password")
      }

      //hash new password
      const hashed = await bcrypt.hash(new_password, 10)

      //insert
      const newPassword = await client.query(passwordResetQuery, [
        hashed,
        email
      ])

      const passwordResetSuccessful = newPassword.rows[0]

      return passwordResetSuccessful

    } catch (error) {
      throw error
      console.log(error)

    } finally {
      client.release()
    }
  }


}