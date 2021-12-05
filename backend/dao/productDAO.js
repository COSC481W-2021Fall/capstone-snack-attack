import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let products;

export default class SignupDAO {
  static async injectDB(conn) {
    if (products) {
      return;
    }
    try {
      products = await conn.db(process.env.ESHOPLOGINCREDENTIALS_NS).collection("products");
    } catch (e) {
      console.error("Can not make connection");
    }
  }

  // checks for a product item that has the same title and store. Items from different stores can have the same title
  static async checkProductsForDuplicate(productInfo) {
    try {
      let duplicate = await products.findOne({
        title: productInfo.title,
        adminId: productInfo.adminId,
      });
      return duplicate;
    } catch (e) {
      console.error(e);
      return duplicate;
    }
  }

  static async addProduct(productInfo) {
    try {
      return await products.insertOne(productInfo);
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  static async findProductById(productId) {
    const _id = new ObjectId(productId);

    try {
      let product = await products.findOne({ _id: _id });
      return product;
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  static async findProductByAdminId(adminId) {
    try {
      let adminProducts = await products.find({ adminId: adminId }).toArray();
      return adminProducts;
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  static async findProducts(pageNumber) {
    try {
      const pageSize = 25;

      let count = await products.countDocuments({});
      let selectedProducts = await products
        .find({})
        .limit(pageSize)
        .skip(pageSize * (pageNumber - 1))
        .toArray();

      return { selectedProducts, count, pages: Math.ceil(count / pageSize) };
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  static async updateProduct(productId, data) {
    const _id = new ObjectId(productId);
    try {
      const updateResult = await products.updateOne({ _id: _id }, { $set: data });
      return updateResult;
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }
}
