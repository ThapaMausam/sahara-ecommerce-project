import type { Request, Response } from "express";
import User from "../database/models/userModel.js"
import bcrypt from "bcrypt"
import generateJwt from "../services/generateJwt.js";
import generateOtp from "../services/generateOtp.js";
import sendMail from "../services/sendMail.js";

class UserController {
    static async register(req: Request, res: Response) {
        try {

            const { username, email, password } = req.body // Destructuring the json data sent by frontend or postman that is received in req.body

            if (!username || !email || !password) {
                res.status(400).json({
                    message: "Please provide username, email and password",
                })
                return
            }

            await User.create({
                username,
                email,
                password: bcrypt.hashSync(password, 10)
            })

            await sendMail({
                to: email,
                subject: "Sahara Registration Notice",
                text: `Registered successfully`,
            })

            // 201 created status
            res.status(201).json({
                message: "User registered successfully",
            })

        } catch (error) {
            
            console.log(error)
            return res.status(500).json({
                message: "Internal server error",
            })

        }
    }

    static async login(req: Request, res: Response) {
        // Step 1: Get user email and password
        const { email, password } = req.body;

        // If email or password is empty
        if (!email || !password) {
            res.status(400).json({
                message: "Please enter email and password"
            })
            return
        }

        // Step 2: Validate email only first since password is stored as hash value in db
        const [user] = await User.findAll({ // here findAll returns array so destructering is more suitable
            where: {
                email: email
            }
        })

        if (!user) {
            res.status(404).json({
                message: "This email user doesn't exist."
            })
            return
        }

        // Step 3: If email is valid then validate password
        const isEqual = bcrypt.compareSync(password, user.password)

        if (!isEqual) {
            res.status(400).json({
                message: "Incorrect Password"
            })
        } else {

            const token = generateJwt(user.id)

            res.status(200).json({
                message: "Logged in successfully.",
                token: token
            })
        }
    }

    static async handleForgotPassword(req: Request, res: Response) {
        const { email } = req.body

        if (!email) {
            res.status(400).json({
                message: "Please enter the email."
            })
            return
        }

        const [user] = await User.findAll({
            where: {
                email: email
            }
        })

        if (!user) {
            res.status(400).json({
                message: "The user doesn't exist."
            })
            return
        }

        const otp = generateOtp()

        try{
            await sendMail({
                to: user.email,
                subject: "Sahara Forgot Password Reset Request",
                text: `OTP : ${otp}`,
            })

            // Storing otp and otp generated time in the user's column
            user.otp = otp.toString()
            user.otpGeneratedTime = Date.now().toString()
            await user.save()

            res.status(200).json({
                message: "OTP sent successfully."
            })
        } catch(error) {
            console.log(error)
        }
    }
}

export default UserController