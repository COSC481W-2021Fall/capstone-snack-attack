import express from "express"
import SignupController from "./signup.controller.js"

const router = express.Router()

router.route("/signup").post(SignupController.verifySignup)

export default router