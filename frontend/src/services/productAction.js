import http from "../http-common";

class ProductActions {

    getAll(page = 1) {
        return http.get("/products/" + page);
    }
    getProductById(productId) {
        return http.get("/product/" + productId);
        // return http.get("/product/617aefcfc95919675656d54c");
    }
    /* search item in amazon store by name
    find(query, by = "name", page = 0) {
      return http.get(`products?${by}=${query}&page=${page}`);
    }
    */

}

export default new ProductActions();  
