import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; 
import { Container } from "react-bootstrap";

import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductAddScreen from "./screens/ProductAddScreen";

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
    <Router>
 

      <main >
        <Container>
  
          <Switch>

            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route path="/addproduct/:adminId" component={ProductAddScreen} />
          
{/*             <Route path="/productlist/:adminId" component={ProductListScreen} />
            <Route path="/productedit/:productId" component={ProductEditScreen} /> */}

          </Switch>

        </Container>
      </main>

    </Router>
  );
};

export default App;