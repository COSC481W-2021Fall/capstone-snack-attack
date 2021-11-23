import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import UserAuthenticationDAO from "./dao/userAuthenticationDAO.js";
import productDAO from "./dao/productDAO.js";
import OrderDAO from "./dao/orderDAO.js";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(process.env.ESHOPLOGINCREDENTIALS_DB_URI, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await UserAuthenticationDAO.injectDB(client);
    await productDAO.injectDB(client);
    await OrderDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
