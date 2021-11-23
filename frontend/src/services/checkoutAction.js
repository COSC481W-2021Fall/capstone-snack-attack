import http from "../http-common";

class CheckoutActions {


    charge(data) {
        return http.post("/charge", data);
    }


}

export default new CheckoutActions();