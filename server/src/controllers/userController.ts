import type { Request, Response } from "express";
import User from "../database/models/userModel.js"
import sequelize from "../database/connection.js";

class UserController {
    static async register(req: Request, res: Response) {
        try {

            const { username, email, password } = req.body // Destructuring the json data sent by frontend or postman that is received in req.body

            if (!username || !email || !password) {
                return res.status(400).json({
                    message: "Please provide username, email and password",
                })
            }

            await User.create({
                username,
                email,
                password,
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
}

export default UserController