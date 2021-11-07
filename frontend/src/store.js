import {
    createStore,
    combineReducers, // combines all reducer files
    applyMiddleware,
  } from "redux";
  import thunk from "redux-thunk";
  import { composeWithDevTools } from "redux-devtools-extension";

  
  // reducers
/*   import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
  } from "./reducers/productReducers";  */
  
  import { cartReducer } from "./reducers/cartReducers"; 
  
  import {
    userLoginReducer,

  } from "./reducers/userReducers";
  
/*   import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderDeliverReducer,
    orderListMyReducer,
    orderListReducer,
  } from "./reducers/orderReducers"; */
  
  const combinedReducers = combineReducers({
/*     productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer, */
    //
    cart: cartReducer, // matches the property name 'cart' in initialState
    userLogin: userLoginReducer, // matches the property name 'userLogin' in initialState

/*     orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer, */ 
  });
  
  // ====== Data stored in LocalStorage ======
  //localStorage.clear()
  const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];  
  
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  

  
  // ====== Initial state with data stored in LocalStorage ======
  const initialState = {
    cart: {
      cartItems: cartItemsFromStorage,
      
    },  
    userLogin: { userInfo: userInfoFromStorage },
  };
  
  const middleware = [thunk];
  
  // ====== Initial state with data stored in LocalStorage ======
  const store = createStore(
    combinedReducers,
    initialState, // for cart and userLogin
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store;