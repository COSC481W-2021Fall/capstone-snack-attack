import http from "../http-common";

class UserActions {
    createAdminAccount(data) {
        return http.post("/signupadmin", data);
    }

    uniqueValid(data) {
        return http.post("/ValidUser", data);
    }

    createCustomerAccount(data) {
        return http.post("/signupadmin", data);
    }

    uniqueCustomerValid(data) {
        return http.post("/ValidUser", data);
    }

}

export default new UserActions();