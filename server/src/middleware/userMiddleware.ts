import type { NextFunction, Request, Response } from "express";
import sendResponse from "../services/sendResponse.js";
import jwt from "jsonwebtoken"
import { envConfig } from "../config/config.js";
import User from "../database/models/userModel.js";

export enum Role {
    Customer = "customer",
    Admin = "admin"
}

interface IExtendedRequest extends Request{
    user?: {
        id: string;
        username: string;
        email: string;
        password: string;
        role: string;
    }
}

class UserMiddleware {
    isUserLoggedIn(req: IExtendedRequest, res: Response, next: NextFunction) {
        // Take token from req.headers
        const token = req.headers.authorization

        if (!token) {
            sendResponse(res, 403, "Empty token")
            return
        }

        // validate token
        jwt.verify(token, envConfig.jwtKey as string, async (err, result: any) => {
            if (err) {
                sendResponse(res, 403, "Token is inavlid", err)
            } else {
                // console.log(result) -> { userID: , }
                // req.userId = result.userId : Middleware allows to transfer req objects

                // Find the user with result.userID
                const userData = await User.findByPk(result.userId)

                if (!userData) {
                    sendResponse(res, 404, "User doesn't exist")
                    return
                }

                req.user = userData

                next() // After next never write success response
            }
        })
    }

    restrictTo(...roles: Role[]) {
        return ((req: IExtendedRequest, res: Response, next: NextFunction) => {
            const userRole = req.user?.role as Role
        })
    }
}

export default new UserMiddleware