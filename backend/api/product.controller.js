import ProductDAO from "../dao/productDAO.js"
import UserAuthenticationDAO from "../dao/userAuthenticationDAO.js"

export default class ProductController {
    static async verifyAddProduct(req, res, next) {
        const productInfo = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            quantity: req.body.quantity,
            category: req.body.category,
            store: req.body.username
        }
        const username = req.body.username

        if (!await ProductController.userIsAdmin(username)) {
            res.json({ error: "user is not a store admin" })
        }
        else if (await ProductController.productIsDuplicate(productInfo)) {
            res.json({ error: "product is a duplicate" })
        }
        else if (productInfo.quantity < 1) {
            res.json({ error: "quantity must be more than 0" })
        }
        else {
            let productResponse = await ProductDAO.addProduct(productInfo)
            res.json({ productResponse })
        }
    }

    static async userIsAdmin(username) {
        try {
            let user = await UserAuthenticationDAO.checkAdminForUsername(username)
            
            if (user) {
                return true
            } else {
                return false
            }
        } catch (e) {
            console.error(e)
            return false
        }
    }

    static async productIsDuplicate(productInfo) {
        try {
            let duplicate = await ProductDAO.checkProductsForDuplicate(productInfo)

            if (duplicate) {
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