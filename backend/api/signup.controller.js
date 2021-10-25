import UserAuthenticationDAO from "../dao/userAuthenticationDAO.js"

export default class SignupController {

    static async userUnique(req, res, next) {
        try {
            const uniqName = req.body.username
            const userrole = req.body.userrole
            let checkName

            if (userrole === "admin") {
               checkName = await UserAuthenticationDAO.checkAdminForUsername(uniqName)

            } else if (userrole === "customer")  {
               checkName = await UserAuthenticationDAO.checkCustomerForUsername(uniqName)
                // res.send({message: "try to connect to customer" })
            } else {
                res.send({message: "error: not admin nor customer"})
            }

            if (checkName) {
                res.status(401).send({message: 'username already exist'});
             //   res.send({message: 'username already exist'});
                return
       
            }
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }


    static async Signup(req, res, next) {
        try {
            const username = req.body.username
            const password = req.body.password
            const userrole = req.body.userrole

            let usernameUnique


            if (userrole === "admin") {
                usernameUnique = await UserAuthenticationDAO.checkAdminForUsername(username)

                if (usernameUnique) {
                    console.error(`username already exist`);
                    res.status(401).send({message: 'username already exist'});               
                    return
                } else {
                    const signupResponse = await UserAuthenticationDAO.createAdminAccount(username, password)
                    res.json({status: "success"})
                }
            } else {
                usernameUnique = await UserAuthenticationDAO.checkCustomerForUsername(username)

                if (usernameUnique) {
                    console.error(`username already exist`);
                    res.status(401).send({message: 'username already exist'});               
                    return
                } else {
                    const signupResponse = await UserAuthenticationDAO.createCustomerAccount(username, password)
                    res.json({status: "success"})
                }

            }

        } catch (e) {
            console.error(e)
            res.status(500).json({ error: e })
        }
    }




}