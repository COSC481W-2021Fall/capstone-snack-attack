import express from "express"
import cors from "cors"
import eShop from "./api/shop.route.js"
import upload from "./api/upload.controller.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/eShop", eShop)
app.use("/api/v1/eShop", upload)
app.use("*", (req, res) => res.status(404).json({error: "Page does not exist"}))

export default app 