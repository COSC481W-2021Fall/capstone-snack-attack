import http from "../http-common";

class CheckoutActions {


    charge(data) {
        return http.post("/charge", data);
    }

    placeorder(data) {
        return http.post("/placeorder", data);
    }


}

export default new CheckoutActions();