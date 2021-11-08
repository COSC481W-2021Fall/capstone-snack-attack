import express from "express";
import SignupController from "./signup.controller.js";
import LoginController from "./login.controller.js"
import ProductController from "./product.controller.js";

const router = express.Router();


router.route("/signup/isunique").post(SignupController.userUnique);
router.route("/signup").post(SignupController.Signup);
router.route("/login").post(LoginController.verifyLogin)


router.route("/product/add").post(ProductController.verifyAddProduct);

router.route("/product/:id").get(ProductController.getProductById);


export default router;
