import { createRequire } from 'module';
import express from "express";
const require = createRequire(import.meta.url);
const charge = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

charge.post("/charge", async (req, res) => {
    try {
        const amount = req.body.amount
        //const id = req.body.id
        const id = req.body.payment.stripe.payment_method_id

        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "CrossAmazon",
            payment_method: id,
            confirm: true,

        });
        res.json({message: "Payment Successful"}) 


    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Payment Failed"})
    }

});

export default charge;