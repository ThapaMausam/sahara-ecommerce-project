import express from "express";
import categoryController from "../controllers/categoryController.js";
// Import the specific functions and the Role enum
import { isUserLoggedIn, restrictTo, Role } from "../middleware/userMiddleware.js";

const router = express.Router();

// Public: Everyone can see categories
// Admin Only: Can create categories
router.route("/")
    .get(categoryController.getCategories)
    .post(
        isUserLoggedIn, 
        restrictTo(Role.Admin), 
        categoryController.addCategory
    );

// Admin Only: Can delete or update categories
router.route("/:categoryId")
    .patch(
        isUserLoggedIn, 
        restrictTo(Role.Admin), 
        categoryController.updateCategory
    )
    .delete(
        isUserLoggedIn, 
        restrictTo(Role.Admin), 
        categoryController.deleteCategory
    );

export default router;