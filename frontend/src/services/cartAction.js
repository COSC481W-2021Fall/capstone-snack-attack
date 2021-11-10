import productActions from "./productAction";
import { ADD_CART_ITEM, REMOVE_CART_ITEM, CHANGE_CART_ITEM_QTY } from "../constants/cartConstants";  


export const addCartItem = (productId) => async (dispatch, getState) => {
   
    productActions.getProductById(productId).then(response => {
        console.log(response)
        
        dispatch({
            type: ADD_CART_ITEM,
            // payload: response.data,
            payload: {
                _id: response.data._id,
                title: response.data.title,
                image: response.data.image,
                price: response.data.price,
                inStock: response.data.quantity,
                qty: 1,
            }
        });

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));

    })
      
}

export const removeFromCart = (productId) => async (dispatch, getState) => {
                 
    dispatch({
        type: REMOVE_CART_ITEM,
        payload: productId,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
     
}

export const changeCartItemQty = (productId,qty) => async (dispatch, getState) => {
                  
    dispatch({
        type: CHANGE_CART_ITEM_QTY,
        payload: {
            productId,
            qty
        }
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
      
} 

