import express from "express"
import categoryController from "../controllers/categoryController.js"

const router = express.Router()

router.route("/add-category").post(categoryController.addCategory)
router.route("/get-category").get(categoryController.getCategories)
router.route("/:categoryId").delete(categoryController.deleteCategory)

export default router