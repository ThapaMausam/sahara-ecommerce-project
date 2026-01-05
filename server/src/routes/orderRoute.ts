import express, { Router } from "express"
import orderController from "../controllers/orderController.js"
import { isUserLoggedIn } from "../middleware/userMiddleware.js"
import errorHandler from "../services/errorHandler.js"

const router: Router = express.Router()

router.route("/").post(isUserLoggedIn, errorHandler(orderController.createOrder))

export default router