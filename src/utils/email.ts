import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()


const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.PASS
  },
  secure: true
})


transport.verify((error, sucess) => {
  if (error) {
    console.log("nodemailer error ", error)
  } else {
    console.log("nodemailer connected")
  }
})

export class emailService {

  static async sendCompanyWelcome(userEmail: string, name: string) {

    try {
      const mailOption = {
        to: userEmail,
        from: process.env.MY_EMAIL,
        html: `
        <div>
        <h1> Welcome to Hunt, ${name}</h1>
        <p> Attract quality and experienced candidtate from 
        a pool of verified users waiting for you. </p>
        <button> Job opening?</button>
        </div>
        `
      }

      transport.sendMail(mailOption)


    } catch (error) {
      console.log(error)
    }
  }

}

emailService.sendCompanyWelcome("mikailajibolawrites@gmail.com", "Ferricool Studio")