import productActions from "./productAction";
import { ADD_CART_ITEM } from "../constants/cartConstants";  


export const addCartItem = (productId) => async (dispatch, getState) => {

    
    productActions.getProductById(productId).then(response => {
        console.log(response)
        
        dispatch({
            type: ADD_CART_ITEM,
            payload: response.data,
        });

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));


    })
      


}