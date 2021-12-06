import {
  createStore,
  combineReducers, // combines all reducer files
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer } from "./reducers/userReducers";

const combinedReducers = combineReducers({
  
  cart: cartReducer, // matches the property name 'cart' in initialState
  userLogin: userLoginReducer, // matches the property name 'userLogin' in initialState
  
});

// ====== Data stored in LocalStorage ======
//localStorage.clear()
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

// ====== Initial state with data stored in LocalStorage ======
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
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
