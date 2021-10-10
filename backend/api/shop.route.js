import express from "express"
import SignupController from "./signup.controller.js"

const router = express.Router()

router.route("/signup/admin").post(SignupController.verifyAdminSignup)
router.route("/signup/customer").post(SignupController.verifyCustomerSignup)

export default router