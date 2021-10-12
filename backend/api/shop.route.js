import express from "express"
import SignupController from "./signup.controller.js"
import LoginController from "./login.controller.js"

const router = express.Router()

router.route("/signup/admin").post(SignupController.verifyAdminSignup)
router.route("/signup/customer").post(SignupController.verifyCustomerSignup)
router.route("/login/admin").post(LoginController.verifyAdminLogin)
router.route("/login/customer").post(LoginController.verifyCustomerLogin)

export default router