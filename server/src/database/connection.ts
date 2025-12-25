import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";
import User from "./models/userModel.js";

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [User],
});

// Test connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected and authenticated successfully.");

        await sequelize.sync({ force: false });
        console.log("Database and Model synced successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

connectDB();

export default sequelize;
