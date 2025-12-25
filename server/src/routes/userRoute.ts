// This route handles users to userController

import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router()

// Old way
// router.post("/register", UserController.register)
// router.get("/register", UserController.register)

// Modern way
router.route("/register").post(UserController.register)

export default router