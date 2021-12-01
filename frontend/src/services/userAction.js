import http from "../http-common";

class UserActions {
  uniqueValid(data) {
    return http.post("/signup/isunique", data);
  }

  createAccount(data) {
    return http.post("/signup", data);
  }

  verifyLogin(data) {
    return http.post("/login", data);
  }

  addProduct(data) {
    return http.post("/product/add", data);
  }

  getAdminProductList(adminId) {
    return http.get("/admin/productList/" + adminId);
  }
}

export default new UserActions();
