import UserAuthenticationDAO from "../dao/userAuthenticationDAO.js"
import PasswordEncryption from "../passwordEncryption.js"

export default class SignupController {
    static async verifyAdminSignup(req, res, next) {
        try {
            const username = req.body.username
            let password = req.body.password
            let usernameUnique = await SignupController.usernameIsUnique(username, true)
            let passwordValid = SignupController.passwordIsValid(password)

            if (!usernameUnique) {
                res.json({ error: "username is not unique" })
            }
            else if (!passwordValid) {
                res.json({ error: "password is not valid" })
            }
            else {
                password = PasswordEncryption.encryptPassword(password)
                let signupResponse = await UserAuthenticationDAO.createAdminAccount(username, password)
                res.json({ signupResponse })
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({ error: e })
        }
    }

    static async verifyCustomerSignup(req, res, next) {
        try {
            let customerInfo = {
                username: req.body.username,
                password: req.body.password,
                address: req.body.address,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                telephone: req.body.telephone,
                city: req.body.city,
                state: req.body.state,
                zip_code: req.body.zip_code
            }
            let usernameUnique = await SignupController.usernameIsUnique(customerInfo.username, false)
            let passwordValid = SignupController.passwordIsValid(customerInfo.password)

            if (!usernameUnique) {
                res.json({ error: "username is not unique" })
            }
            else if (!passwordValid) {
                res.json({ error: "password is not valid" })
            }
            else {
                customerInfo.password = PasswordEncryption.encryptPassword(customerInfo.password)
                let signupResponse = await UserAuthenticationDAO.createCustomerAccount(customerInfo)
                res.json({ signupResponse })
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({ error: e })
        }
    }

    static async usernameIsUnique(username, isAdmin) {
        try {
            let user
            if (isAdmin) {
                user = await UserAuthenticationDAO.checkAdminForUsername(username)
            } else {
                user = await UserAuthenticationDAO.checkCustomerForUsername(username)
            }
            
            if (user) {
                return false
            } else {
                return true
            }
        } catch (e) {
            console.error(e)
            return false
        }
    }

    static passwordIsValid(password) {
        if (password.length < 8) {
            return false
        }

        let letters = /^[a-zA-Z]+$/
        let numbers = /^[0-9]+$/
        let hasLetter = false
        let hasNumber = false

        for (var i=0; i<password.length; i++) {
            if (password.charAt(i).match(letters)) {
                hasLetter = true
            }
            if (password.charAt(i).match(numbers)) {
                hasNumber = true
            }
        }

        if (hasLetter && hasNumber) {
            return true
        }
    }
}