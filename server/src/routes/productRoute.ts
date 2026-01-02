import express from "express"
import productController from "../controllers/productController.js"
import { allowTo, isUserLoggedIn, Role } from "../middleware/userMiddleware.js"
import { multer , storage } from "../middleware/multerMiddlware.js"

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
        productController.updateProduct
    )

export default router