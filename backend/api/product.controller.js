import ProductDAO from "../dao/productDAO.js";
import UserAuthenticationDAO from "../dao/userAuthenticationDAO.js";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
import asyncHandler from "express-async-handler";

export default class ProductController {
  static async verifyAddProduct(req, res, next) {
    const productInfo = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      quantity: req.body.quantity,
      category: req.body.category,
      adminId: req.body.adminId,
      image: req.body.image,
    };

    if (!(await ProductController.userIsAdmin(ObjectId(productInfo.adminId)))) {
      res.json({
        success: "false",
        error: "Error: This user is not a store manager.",
      });
    } else if (await ProductController.productIsDuplicate(productInfo)) {
      res.json({
        success: "false",
        error: "Error: The product is a duplicate for this store.",
      });
    } else if (productInfo.quantity < 1) {
      res.json({
        success: "false",
        error: "Error: The quantity must be greater than 0.",
      });
    } else {
      let productResponse = await ProductDAO.addProduct(productInfo);
      if (!productResponse.acknowledged) {
        res.json({
          success: "false",
          error: "Error: Product was not added to database.",
        });
      } else {
        res.json({
          success: "true",
        });
      }
    }
  }

  static async userIsAdmin(adminId) {
    try {
      let user = await UserAuthenticationDAO.checkAdminForId(adminId);

      if (user) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async productIsDuplicate(productInfo) {
    try {
      let duplicate = await ProductDAO.checkProductsForDuplicate(productInfo);

      if (duplicate) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  static async getProductById(req, res, next) {
    try {
      const productId = req.params.id;

      let product = await ProductDAO.findProductById(productId);

      //return the username of the seller with the product
      let adminId = ObjectId(product.adminId);
      let admin = await UserAuthenticationDAO.checkAdminForId(adminId);
      product.seller = admin.username;

      if (product) {
        res.json(product);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async getProducts(req, res, next) {
    try {
      let pageNumber = Number(req.params.pageNumber) || 1;
      let selectedProducts = await ProductDAO.findProducts(pageNumber);

      if (selectedProducts) {
        res.json(selectedProducts);
      } else {
        res.status(404).send({ message: "Unable to fetch any products" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async getProductByAdminId(req, res, next) {
    try {
      let adminId = req.params.adminId; // how to get teh adminId.
      let adminProducts = await ProductDAO.findProductByAdminId(adminId);

      if (adminProducts) {
        res.json(adminProducts);
      } else {
        res.status(404).send({ message: "Product not found" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async updateProductByProductId(req, res, next) {
    try {
      const { title, price, description, quantity, category } = req.body;
      const productId = req.params.productId;

      const updateInfo = {
        title: title,
        price: price,
        description: description,
        quantity: quantity,
        category: category,
      };

      const update = await ProductDAO.updateProduct(productId, updateInfo);

      if (update) {
        res.json(update);
      } else {
        res.status(404);
        throw new Error("Product not found");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
