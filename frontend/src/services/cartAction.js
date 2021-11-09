import productActions from "./productAction";
import { ADD_CART_ITEM, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addCartItem = (productId) => async (dispatch, getState) => {
  productActions.getProductById(productId).then((response) => {
    console.log(response);

    dispatch({
      type: ADD_CART_ITEM,
      payload: response.data,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  });
};
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
