import OrderDAO from "../dao/orderDAO.js";
import mongodb from "mongodb"

import { createRequire } from 'module';
import express from "express";
const require = createRequire(import.meta.url);
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);


const ObjectId = mongodb.ObjectId

export default class OrderController {
    static async placeOrder(req, res, next){
        const orderData = req.body;
        const paymentInfo = {
            amount: req.body.amount,
            id: req.body.payment.stripe.payment_method_id
        }

        if(! await OrderController.charge(paymentInfo)){
            res.status(401).json({ 
                success: "false", 
                error: "Error: Payment Failed." 
            })
        } else {        
            let orderResponse = await OrderDAO.addOrder(orderData)
            if (!orderResponse.acknowledged) {
                res.status(500).json({
                    success: "false",
                    error: "Error: Order was not added to database."
                })
            }
            else {
                res.json({ 
                    success: "true"
                })
            }
        }
    }

    static async charge(paymentInfo){
        try {
            const amount = paymentInfo.amount
            const id = paymentInfo.id
    
            let payment = await stripe.paymentIntents.create({
                amount: amount,
                currency: "USD",
                description: "CrossAmazon",
                payment_method: id,
                confirm: true,    
            });
            
            if(payment){
                return true
            } else {
                return false
            }    
        } catch (e) {
            console.log(e)
            return false
        }

    }

    static async getCustomerOrders(req, res, next) {
        try {
            let customer = req.params.customerId
            let orders = await OrderDAO.findCustomerOrders(customer)

            if (orders) {
                res.json(orders)
            } else {
                res.status(404).send({message: 'Unable to fetch any orders for this customer.'})
            }
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }

    static async getStoreOrders(req, res, next) {
        try {
            let admin = req.params.adminId
            let orders = await OrderDAO.findStoreOrders(admin)

            if (orders) {
                //go through items in each order and remove those that do not belong to this admin
                for (let i=0; i<orders.length; i++) {
                    let order = orders[i]
                    let allItems = order.items
                    let storeItems = []
                    for (let j=0; j<allItems.length; j++) {
                        let item = allItems[j];
                        if (item.adminId && item.adminId == admin) {
                            storeItems.push(item)
                        }
                    }
                    order.items = storeItems
                }
                
                res.json(orders)
            } else {
                res.status(404).send({message: 'Unable to fetch any orders for this store.'})
            }
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
}