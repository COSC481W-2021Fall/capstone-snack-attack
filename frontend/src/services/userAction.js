import http from "../http-common";

class UserActions {
    createAdminAccount(data) {
        return http.post("/signup/admin", data);
    }

    uniqueValid(data) {
        return http.post("/signup/validuser", data);
    }

    createCustomerAccount(data) {
        return http.post("/signup/customer", data);
    }



}

export default new UserActions();