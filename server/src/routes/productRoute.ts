import express from "express"
import productController from "../controllers/productController.js"
import { allowTo, isUserLoggedIn, Role } from "../middleware/userMiddleware.js"

const router = express.Router()

router.route("/")
    .post(
    isUserLoggedIn,
    allowTo(Role.Admin),
    productController.createProduct
    )
    .get(productController.getAllProduct)

router.route("/:productId")
    .get(productController.getSingleProduct)
    .delete(
        isUserLoggedIn,
        allowTo(Role.Admin),
        productController.deleteProduct
    )
    .patch(
        isUserLoggedIn, 
        allowTo(Role.Admin), 
        productController.updateProduct
    )

export default router