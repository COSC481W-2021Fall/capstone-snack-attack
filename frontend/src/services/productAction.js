import http from "../http-common";
/*
import Axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/productConstants';

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};
*/

class ProductActions {

    getAll(page = 1) {
        return http.get("/products/" + page);
    }
    getProductById(productId) {
        return http.get("/product/" + productId);
        // return http.get("/product/617aefcfc95919675656d54c");
    }
    /*
    find(query, by = "name", page = 0) {
      return http.get(`products?${by}=${query}&page=${page}`);
    }
    */

}

export default new ProductActions();  
