import { ADD_CART_ITEM, REMOVE_CART_ITEM, CHANGE_CART_ITEM_QTY } from "../constants/cartConstants";

export const cartReducer = (
    state = {cartItems: []}, action
) => {
    switch (action.type ) {
        case ADD_CART_ITEM:
            const itemFromPayload = action.payload;
            // Check if there is the same item has been added before
            const existedItem = state.cartItems.find(
                (iteratedItem) => iteratedItem._id === itemFromPayload._id
            );

            //console.log(existedItem)

            if (existedItem){
                return {
                    ...state,
                    cartItems: state.cartItems.map((iteratedItem) =>
                        iteratedItem._id === existedItem._id
                            ? itemFromPayload : iteratedItem
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, itemFromPayload],
                };
            }

        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x._id !== action.payload
                ),
            };

        
        case  CHANGE_CART_ITEM_QTY:

            const changeQtyItem = state.cartItems.find(
                (iteratedItem) => iteratedItem._id === action.payload.productId
            );

            changeQtyItem.qty = action.payload.qty


            return {
                ...state,
                cartItems: state.cartItems.map((iteratedItem) =>
                    iteratedItem._id === action.payload.productId
                        ? changeQtyItem : iteratedItem
                ),

            }   

        default:
            return state;
    }
};