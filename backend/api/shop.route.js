import express from "express"
import SignupController from "./signup.controller.js"
import ProductController from "./product.controller.js"

const router = express.Router()

router.route("/signup/admin").post(SignupController.verifyAdminSignup)
router.route("/signup/customer").post(SignupController.verifyCustomerSignup)

router.route("/product/add").post(ProductController.verifyAddProduct)

export default router