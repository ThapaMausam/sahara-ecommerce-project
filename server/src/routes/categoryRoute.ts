import express from "express"
import categoryController from "../controllers/categoryController.js"

const router = express.Router()

router.route("/").post(categoryController.addCategory).get(categoryController.getCategories)
router.route("/:categoryId").delete(categoryController.deleteCategory).patch(categoryController.updateCategory)

export default router