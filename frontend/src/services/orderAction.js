import axios from 'axios';
import http from "../http-common";

import {
    ORDERS_LIST_REQUEST,
    ORDERS_LIST_SUCCESS,
    ORDERS_LIST_FAIL,
}from '../constants/orderConstants';

//Get currently logged in user orders
export const myOrders =(id) => async (dispatch) => {
    try {

        dispatch({type: ORDERS_LIST_REQUEST});

        const { data } = await axios.get("http://localhost:5000/api/v1/eShop/orders")

        dispatch ({
            type: ORDERS_LIST_SUCCESS,
            payload: data
        })
    }catch (error) {
        dispatch({
            type: ORDERS_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}