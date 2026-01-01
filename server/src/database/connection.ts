import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [User, Product, Category],
});

// Test connection
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected and authenticated successfully.");

        await sequelize.sync({ force: false, alter: false });
        console.log("Database and Model synced successfully.");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};

Product.belongsTo(Category, {foreignKey: "categoryId"})
Category.hasMany(Product, {foreignKey: "categoryId"})


export default sequelize;
