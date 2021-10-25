import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let admin
let customer

export default class UserAuthenticationDAO {
    static async injectDB(conn) {
        if (admin && customer) {
            return
        }
        try {
            admin = await conn.db(process.env.ESHOPLOGINCREDENTIALS_NS).collection("admin")
            customer = await conn.db(process.env.ESHOPLOGINCREDENTIALS_NS).collection("customer")
        } catch (e) {
            console.error(
                'Can not make connection',
            )
        }
    }

    static async checkAdminForUsername(username) {
        try {
            let user = await admin.findOne({ username: username })
            return user
        } catch (e) {
            console.error(e)
            return user
        }
    }

    static async checkCustomerForUsername(username) {
        try {
            let user = await customer.findOne({ username: username })
            return user
        } catch (e) {
            console.error(e)
            return user
        }
    }

    static async createAdminAccount(username, password) {
        try {
            const adminAccount = {
                username: username,
                password: password,
            }
            return await admin.insertOne(adminAccount)
        } catch (e) {
            console.error(e)
            return { error: e}
        }
    }

    static async createCustomerAccount(username, password) {
        try {
            const customerAccount = {
                username: username,
                password: password,
            }

            return await customer.insertOne(customerAccount)
        } catch (e) {
            console.error(e)
            return { error: e}
        }
    }





}