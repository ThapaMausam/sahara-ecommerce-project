import express from "express";
import categoryController from "../controllers/categoryController.js";
// Import the specific functions and the Role enum
import { isUserLoggedIn, allowTo, Role } from "../middleware/userMiddleware.js";

const router = express.Router();

// Public: Everyone can see categories
// Admin Only: Can create categories
router.route("/")
    .get(categoryController.getCategories)
    .post(
        isUserLoggedIn, 
        allowTo(Role.Admin), 
        categoryController.addCategory
    );

// Admin Only: Can delete or update categories
router.route("/:categoryId")
    .patch(
        isUserLoggedIn, 
        allowTo(Role.Admin), 
        categoryController.updateCategory
    )
    .delete(
        isUserLoggedIn, 
        allowTo(Role.Admin), 
        categoryController.deleteCategory
    );

export default router;