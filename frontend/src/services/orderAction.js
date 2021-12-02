import http from "../http-common";

class OrderAction {
    getOrdersByCustomerId(customerId) {
        return http.get("/customerOrders/" + customerId);

    }
}

export default new OrderAction();