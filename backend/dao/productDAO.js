import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let products

export default class SignupDAO {
    static async injectDB(conn) {
        if (products) {
            return
        }
        try {
            products = await conn.db(process.env.ESHOPLOGINCREDENTIALS_NS).collection("products")
        } catch (e) {
            console.error(
                'Can not make connection',
            )
        }
    }

    // checks for a product item that has the same title and store. Items from different stores can have the same title
    static async checkProductsForDuplicate(productInfo) {
        try {
            let duplicate = await products.findOne({ title: productInfo.title, adminId: productInfo.adminId })
            return duplicate
        } catch (e) {
            console.error(e)
            return duplicate
        }
    }

    static async addProduct(productInfo) {
        try {
            return await products.insertOne(productInfo)
        } catch (e) {
            console.error(e)
            return { error: e}
        }
    }
}