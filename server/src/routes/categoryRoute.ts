import express from "express"
import categoryController from "../controllers/categoryController.js"
import userMiddleware from "../middleware/userMiddleware.js"

const router = express.Router()

router.route("/").post(userMiddleware.isUserLoggedIn, categoryController.addCategory).get(categoryController.getCategories) // next allows to move between the routes
router.route("/:categoryId").delete(categoryController.deleteCategory).patch(categoryController.updateCategory)

export default router