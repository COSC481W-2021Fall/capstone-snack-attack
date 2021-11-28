import {
    ORDERS_LIST_REQUEST,
    ORDERS_LIST_SUCCESS,
    ORDERS_LIST_FAIL,
} from '../constants/orderConstants';

//order history request
export const myOrdersReducers =(state ={orders:[]}, action) => {
    switch (action.type) {

        case ORDERS_LIST_REQUEST:
            return {
             loading: true
            }

        case ORDERS_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            } 

        case ORDERS_LIST_FAIL:
            return {
                loading: false,
                errors: action.payload
            }
        
        default:
            return state;
    }
}