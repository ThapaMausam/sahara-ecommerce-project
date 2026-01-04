import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";
import Order from "./models/orderModel.js";
import OrderDetails from "./models/orderDetailsModel.js";
import Payment from "./models/paymentModel.js";

const sequelize = new Sequelize(envConfig.connectionString as string, {
    models: [User, Product, Category, Order, OrderDetails, Payment],
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

// Product X Category
Product.belongsTo(Category, {foreignKey: "categoryId"})
Category.hasMany(Product, {foreignKey: "categoryId"})

// Order X User
Order.belongsTo(User, {foreignKey: "userId"})
User.hasMany(Order, {foreignKey: "userId"})

// Payment X Order
Payment.belongsTo(Order, {foreignKey: "orderId"})
Order.hasOne(Payment, {foreignKey: "orderId"})

// Order X Order Details
OrderDetails.belongsTo(Order, {foreignKey: "orderId"})
Order.hasMany(OrderDetails, {foreignKey: "orderId"})

// Product X Order Details
OrderDetails.belongsTo(Product, {foreignKey: "productId"})
Product.hasMany(OrderDetails, {foreignKey: "productId"})

export default sequelize;
