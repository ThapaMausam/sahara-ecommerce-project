import { Sequelize } from "sequelize-typescript"
import { envConfig } from "../config/config.js"

import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url) // Converts url -> real path
console.log("Filename: " + __filename)
const __dirname = dirname(__filename)
console.log("Dirname: " + __dirname)


// Create Sequelize instance with models
// In ES Modules, __dirname is not supported but only in commonjs, instead use import.meta.url
const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [__dirname + "/models"]
})

// Autheticate (test connection)
export const initializeDatabasePromise = sequelize.authenticate()
    .then(() => {
        console.log("Database connected and authenticated successfully.")
        return sequelize
    })
    .catch(error => {
        console.error("Database connection failed:", error)
        throw error // Re-throw to maintain the error chain
    })

// Sync models to database
// force: false, create tables if not exist, but don't delete existing data
// force: true, drop all tables and recreate empty one from scratch
sequelize.sync({force: false}).then(() => {
    console.log("Local changes injected to database successfully.")
})

export default sequelize