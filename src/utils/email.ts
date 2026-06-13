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

  static async sendnewApplicationNotif(companyEmail: string, job_title: string, name: string) {
    try {

      const mailOption = {
        to: companyEmail,
        from: process.env.MY_EMAIL,
        html:
          `<div>
        <h1> New Application for ${name}</h1>
        <p>A new job seeker has applied to ${job_title}.</p>
        <button> View application </button>
        </div>
      `
      }

      transport.sendMail(mailOption)

    } catch (error) {
      console.log(error)
    }
  }

  static async sendStatusChangeNotif(userEmail: string, title: string, status: string) {

    try {

      const mailOption = {
        to: userEmail,
        from: process.env.MY_EMAIL,
        html:
          `
        <html>
        <h1>Status update for your application</h1>
        <p>Your application for ${title} is ${status} </p>
        <button>View application</button>
        </html>
        `
      }

      transport.sendMail(mailOption

      )
    } catch (error) {
      console.log(error)
    }
  }

}

//emailService.sendCompanyWelcome("mikailajibolawrites@gmail.com", "Ferricool Studio")