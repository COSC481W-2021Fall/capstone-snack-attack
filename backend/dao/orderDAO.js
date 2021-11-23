import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let orders

export default class OrderDAO {
    static async injectDB(conn) {
        if (orders) {
            return
        }
        try {
            orders = await conn.db(process.env.ESHOPLOGINCREDENTIALS_NS).collection("orders")
        } catch (e) {
            console.error(
                'Can not make connection',
            )
        }
    }

    static async addOrder(orderData) {
        try {
            return await orders.insertOne(orderData)
        } catch (e) {
            console.error(e)
            return { error: e}
        }
    }


}