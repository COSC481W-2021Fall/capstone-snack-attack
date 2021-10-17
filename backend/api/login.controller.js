import UserAuthenticationDAO from "../dao/userAuthenticationDAO.js"

export default class LoginController {


    static async verifyLogin(req, res, next) {
        try {
            const username = req.body.username
            const password = req.body.password
            const userrole = req.body.userrole
            let user

            if (userrole === "admin") {
                user = await UserAuthenticationDAO.checkAdminForUsername(username) 
                
                if (user && ( password === user.password)) {
                    res.json({
                        _id: user._id,
                        username: user.username,
                        userrole: "admin"
                    })
                } else {
                    res.status(401).send({message: 'invalid email or password'});
                }

            } else {
                user = await UserAuthenticationDAO.checkCustomerForUsername(username)

                if (user && (password === user.password)) {
                    res.json({
                        _id: user._id,
                        username: user.username,
                        userrole: "customer"
                    })
                } else {
                    res.status(401).send({message: 'invalid email or password'});
                }

            }
        } catch (e) {
            res.status(500).json({error: e.message})
        }   
    }
    

}