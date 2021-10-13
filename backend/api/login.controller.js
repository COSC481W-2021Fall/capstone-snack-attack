import UserAuthenticationDAO from "../dao/userAuthenticationDAO.js"
import PasswordEncryption from "../passwordEncryption.js"

export default class LoginController {
    static async verifyAdminLogin(req, res, next) {
        try {
            const username = req.body.username
            const password = PasswordEncryption.encryptPassword(req.body.password)

            if (await LoginController.usernameAndPasswordMatch(username, password, true)) {
                res.json({ message: "login valid" })
            } 
            else {
                res.json({ error: "username and password do not match" })
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({ error: e })
        }
    }

    static async verifyCustomerLogin(req, res, next) {
        try {
            const username = req.body.username
            const password = PasswordEncryption.encryptPassword(req.body.password)

            if (await LoginController.usernameAndPasswordMatch(username, password, false)) {
                res.json({ message: "login valid" })
            } 
            else {
                res.json({ error: "username and password do not match" })
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({ error: e })
        }
    }

    static async usernameAndPasswordMatch(username, password, isAdmin) {
        try {
            let foundUser
            if (isAdmin) {
                foundUser = await UserAuthenticationDAO.checkAdminForUsername(username)
            } else {
                foundUser = await UserAuthenticationDAO.checkCustomerForUsername(username)
            }
            
            if (!foundUser) {
                return false
            }
            else if (foundUser.username == username && foundUser.password == password) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.error(e)
            return false
        }
    }
}