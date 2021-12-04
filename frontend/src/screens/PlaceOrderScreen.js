import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { useState } from "react";

import PaymentForm from "../components/paymentForm";
import CheckoutAction from "../services/checkoutAction";


function PlaceOrderScreen() {

  const [paymentMethod, setPaymentMethod] = useState({});

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cartItemsInfo = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cartItemsInfo;

  console.log(userInfo);
  console.log(cartItems);
  console.log(shippingAddress);
  
  // If the user does not login as a customer, customerId="anonymous"
  let customerId;
  if (userInfo && userInfo.userrole === "customer") {
    customerId = userInfo._id;
  } else {
    customerId = "anonymous";
  }

  console.log(customerId);

  // The total price of ordered items
  
  const itemsPrice = (Math.round(
    (cartItems.reduce((price, item) => price + item.qty * item.price, 0) + Number.EPSILON
  ) * 100) / 100 ).toFixed(2);
  const shippingPrice = (itemsPrice > 25 ? 0 : 10).toFixed(2); 
  const taxPrice = (Math.round(0.15*itemsPrice*100)/100).toFixed(2);
  const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

  console.log(itemsPrice);
  console.log(shippingPrice);
  console.log(taxPrice);
  console.log(totalPrice);

  if (cartItems.length === 0) {
    return <div> Thank you for shopping! Your shopping cart is empty now. </div>;
  }

  if (!shippingAddress.name) {
    return <div> Please provide your shipping address! </div>;
  }
 
  const handlePlaceOrder = (paymentMethod, cartItems, shippingAddress) => {
    console.log(paymentMethod)    
    const orderData = {
      "items": cartItems,
      "shipping": {
        "name": shippingAddress.name,
        "address": shippingAddress.address,
        "city": shippingAddress.city,
        "state": shippingAddress.state,
        "zipcode": shippingAddress.zipcode,
      },
      "customer": customerId,
      "payment": {
        "gateway": 'stripe',
        "stripe": {
        "payment_method_id": paymentMethod["id"]
        }
      },
      "amount": totalPrice*100,      // amount of payment, cents
    }

    // post orderData to the backend
    console.log(orderData)

    CheckoutAction.placeorder(orderData).then(
      (response) => { 
        console.log(response); 
      
        window.localStorage.clear("cart");
        window.location.reload(false);
      }        
    ).catch((e) => { 
      console.log(e);       
      window.alert("Place the order failed. Please try again.")
    } )


  };

  return (
    
    <Row>
      <Col md={8}>
        <h3>your order</h3> 
      
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>Shipping information</h3>             
            <div>Name: {shippingAddress.name}</div>
            <div>Address: {shippingAddress.address} </div>
            <div>City: {shippingAddress.city}</div>
            <div>State: {shippingAddress.state} </div>
            <div>Zip Code: {shippingAddress.zipcode}</div>
          </ListGroup.Item>

          <h3>Order Items</h3>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}> 
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.title} fluid rounded />
                    </Col>
                    <Col md={1}>${item.price}</Col>
                    <Col md={1}>Quantity: {item.qty}</Col>
                  </Row>

            </ListGroup.Item>
          ))}

          <ListGroup.Item>
            <h3>Payment</h3>            
            <PaymentForm setPaymentMethod={setPaymentMethod}/>
          </ListGroup.Item>
        </ListGroup>
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Order Summary</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${itemsPrice}</Col>
              </Row>         
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${shippingPrice}</Col>
              </Row>              
              <div > Free shipping on orders $25+ </div>        
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${taxPrice}</Col>
              </Row>         
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${totalPrice}</Col>
              </Row>         
            </ListGroup.Item>

            <ListGroup.Item> 
              <Button 
                onClick={(event) => {handlePlaceOrder(paymentMethod, cartItems, shippingAddress)}}
                disabled = {!paymentMethod.id}
                >Place your order</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card> 
      </Col>

    </Row>
  )
}

export default PlaceOrderScreen;
