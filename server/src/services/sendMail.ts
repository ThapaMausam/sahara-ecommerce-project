import nodemailer from "nodemailer"
import { envConfig } from "../config/config.js"

interface IData {
    to: string;
    subject: string;
    text: string;
}

function sendMail(data: IData) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: envConfig.email,
            pass: envConfig.emailPassword
        }
    })

    const mailOptions = {
        from: "Sahara<tmausammagar@gmail.com",
        to: data.to,
        subject: data.subject,
        text: data.text,
    }

    transporter.sendMail(mailOptions)
}

export default sendMail