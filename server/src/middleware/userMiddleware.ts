import type { NextFunction, Request, Response } from "express";
import sendResponse from "../services/sendResponse.js";
import jwt from "jsonwebtoken"
import { envConfig } from "../config/config.js";

class UserMiddleware {
    isUserLoggedIn(req: Request, res: Response, next: NextFunction) {
        // Take token from req.headers
        const token = req.headers.authorization

        if (!token) {
            sendResponse(res, 403, "Empty token")
            return
        }

        // validate token
        jwt.verify(token, envConfig.jwtKey as string, (err, result) => {
            if (err) {
                sendResponse(res, 403, "Token is inavlid", err)
            } else {
                console.log(result)
                // req.userId = result.userId : Middleware allows to transfer req objects
                next() // After next never write success response
            }
        })
    }
}

export default new UserMiddleware