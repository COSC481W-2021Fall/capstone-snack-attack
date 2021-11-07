import http from "../http-common";

class ProductActions {


    getProductById(productId) {
        return http.get("/product/" + productId);
        // return http.get("/product/617aefcfc95919675656d54c");
    }

}

export default new ProductActions();  