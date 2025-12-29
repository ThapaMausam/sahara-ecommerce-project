import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";
import User from "./models/userModel.js";
import Product from "./models/prductModel.js";

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [User, Product],
});

// Test connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected and authenticated successfully.");

        await sequelize.sync({ force: false, alter: true });
        console.log("Database and Model synced successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

connectDB();

export default sequelize;
