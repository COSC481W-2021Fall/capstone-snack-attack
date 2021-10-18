import React from "react";
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";

// import Header from "./components/Header";
// import Footer from "./components/Footer";

// import ProductScreen from "./screens/ProductScreen";
// import CartScreen from "./screens/CartScreen";
// import ProfileScreen from "./screens/ProfileScreen";
// import ShippingScreen from "./screens/ShippingScreen";
// import PaymentScreen from "./screens/PaymentScreen";
// import PlaceOrderScreen from "./screens/PlaceOrderScreen";
// import OrderScreen from "./screens/OrderScreen";
// import UserListScreen from "./screens/UserListScreen";
// import UserEditScreen from "./screens/UserEditScreen";
// import OrderListScreen from "./screens/OrderListScreen";

const App = () => {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <a className="brand" href="/">
              CrossAmazon
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a>
            <a href="/login">Sign In</a>
          </div>
        </header>
        <main>
          <Container>
            <Switch>
              <Route exact path="/" component={HomeScreen} />
              <Route exact path="/login" component={LoginScreen} />
              <Route exact path="/register" component={RegisterScreen} />

              {/*             <Route path="/productlist/:adminId" component={ProductListScreen} />
            <Route path="/productedit/:productId" component={ProductEditScreen} /> */}
            </Switch>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
