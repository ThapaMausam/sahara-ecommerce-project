import dotenv from "dotenv"
dotenv.config()

export const envConfig = {
    port: process.env.PORT,
    connectionString: process.env.CONNECTION_STRING,
    jwtKey: process.env.JWT_SECRET_KEY,
    jwtExpiry: process.env.JWT_EXPIRES_IN as string,
    email: process.env.EMAIL,
    emailPassword: process.env.EMAIL_PASSWORD
}