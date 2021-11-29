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

    getCustomerOrders(customerId) {
        return http.get("/customerOrders/" + customerId);
    }

    getStoreOrders(adminId) {
        return http.get("/storeOrders/" + adminId);
    }

}

export default new UserActions();