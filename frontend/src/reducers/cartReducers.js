import { ADD_CART_ITEM } from "../constants/cartConstants";

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



        default:
            return state;
    }
};