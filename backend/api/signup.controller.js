import SignupDAO from "../dao/signupDAO.js"

export default class SignupController {
    static async verifySignup(req, res, next) {
        try {
            const username = req.body.username
            const password = req.body.password
            let usernameUnique = await SignupController.usernameIsUnique(username)
            let passwordValid = SignupController.passwordIsValid(password)

            if (!usernameUnique) {
                res.json({ error: "username is not unique" })
            }
            else if (!passwordValid) {
                res.json({ error: "password is not valid" })
            }
            else {
                let signupResponse = await SignupDAO.createAdminAccount(username, password)
                res.json({ signupResponse })
            }
        } catch (e) {
            console.error(e)
            res.status(500).json({ error: e })
        }
    }

    static async usernameIsUnique(username) {
        try {
            let user = await SignupDAO.checkAdminForUsername(username)
            if (user) {
                return false
            }
            else {
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