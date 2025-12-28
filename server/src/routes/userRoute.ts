// This route handles users to userController

import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router()

// Old way
// router.post("/register", UserController.register)
// router.get("/register", UserController.register)

// Modern way
router.route("/register").post(UserController.register)
router.route("/login").post(UserController.login)
router.route("/forgot-password").post(UserController.handleForgotPassword)
router.route("/verify-otp").post(UserController.verifyOtp)
router.route("/reset-password").post(UserController.resetPassword)

export default router