import { envConfig } from "./src/config/config.js";
import User from "./src/database/models/userModel.js";
import bcrypt from "bcrypt"

async function adminSeeder() {
    const [user] = await User.findAll({
        where: {
            email: envConfig.adminEmail
        }
    })

    if (!user) {
        await User.create({
            username: envConfig.adminUsername,
            email: envConfig.adminEmail,
            password: bcrypt.hashSync(envConfig.adminPassword as string, 10),
            role: "admin"
        })
        console.log("Admin Seeded.")
    } else {
        console.log("Admin already seeded.")
    }
}

export default adminSeeder