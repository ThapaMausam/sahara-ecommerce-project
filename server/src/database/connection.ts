import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config.js"

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [__dirname + "/models"]
})

export const initializeDatabasePromise = sequelize.authenticate()
    .then(() => {
        console.log("Database connected and authenticated successfully.")
        return sequelize
    })
    .catch(error => {
        console.error("Database connection failed:", error)
        throw error // Re-throw to maintain the error chain
    })

export default sequelize