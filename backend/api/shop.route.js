import express from "express";
import SignupController from "./signup.controller.js";
import LoginController from "./login.controller.js";
import ProductController from "./product.controller.js";
import OrderController from "./order.controller.js";

const router = express.Router();

router.route("/signup/isunique").post(SignupController.userUnique);
router.route("/signup").post(SignupController.Signup);
router.route("/login").post(LoginController.verifyLogin);
router.route("/products/:pageNumber").get(ProductController.getProducts);

router.route("/product/add").post(ProductController.verifyAddProduct);
router.route("/product/:id").get(ProductController.getProductById);
router.route("/admin/productList/:adminId").get(ProductController.getProductByAdminId);
router.route("/admin/product/:productId/edit").post(ProductController.updateProductByProductId);
router.route("/placeorder").post(OrderController.placeOrder);


export default router;
