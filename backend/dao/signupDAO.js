import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let admin

export default class SignupDAO {
    static async injectDB(conn) {
        if (admin) {
            return
        }
        try {
            admin = await conn.db(process.env.ESHOPLOGINCREDENTIALS_NS).collection("admin")
        } catch (e) {
            console.error(
                'Can not make connection',
            )
        }
    }

    static async checkAdminForUsername(username) {
        try {
            let query = {$text: { $search: username}}
            let user = await admin.findOne({ username: username })
            return user
        } catch (e) {
            console.error(e)
            return users
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
}