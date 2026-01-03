import express from "express"
import productController from "../controllers/productController.js"
import { allowTo, isUserLoggedIn, Role } from "../middleware/userMiddleware.js"
import { multer , storage } from "../middleware/multerMiddlware.js"
import errorHandler from "../services/errorHandler.js"

const upload = multer({storage: storage})

const router = express.Router()

router.route("/")
    .get(productController.getAllProduct)
    .post(
    isUserLoggedIn,
    allowTo(Role.Admin),
    upload.single("productImage"),
    productController.createProduct
    )

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
        upload.single("productImage"),
        errorHandler(productController.updateProduct) // Instead of using try-catch in every method
    )

export default router