import jwt from "jsonwebtoken"
import { envConfig } from "../config/config.js"

function generateJwt(userId: string) {
    const token = jwt.sign(
        { userId: userId }, 
        envConfig.jwtKey as string, 
        {
            expiresIn: envConfig.jwtExpiry
        } as jwt.SignOptions
    )
    return token
}

export default generateJwt