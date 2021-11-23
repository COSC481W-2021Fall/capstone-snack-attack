import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import PaymentForm from "../components/paymentForm";
import CheckoutAction from "../services/checkoutAction";


function PlaceOrderScreen() {

  const [paymentMethod, setPaymentMethod] = useState({});
  const [chargesuccess, setChargesuccess] = useState(false);

  if(chargesuccess) {
    return <div> Place your order successfully. Thank you for shopping! </div>;
  }

  const handlePlaceOrder = (paymentMethod) => {
    console.log(paymentMethod)

    const orderData = {
      "payment": {
        "gateway": 'stripe',
        "stripe": {
        "payment_method_id": paymentMethod["id"]
        }
      },
      "amount": 30*100,      // amount of payment

    }

    // post orderData to the backend
    console.log(orderData)
    CheckoutAction.charge(orderData).then(
      (response) => { 
        console.log(response); 
        setChargesuccess(true);
      }        
    ).catch((e) => { 
      console.log(e); 
      setChargesuccess(false);
      window.alert("Payment failed. Please try again.")
    } )


  };

  return (
    // <div>This is place order screen.</div>
    <Row>
      <Col md={8}>
        <h3>your order</h3> 
      
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h3>Shipping information</h3> 
            placeholder for shipping info
          </ListGroup.Item>

          <ListGroup.Item>
            <h3>Order Items</h3> 
            placeholder for order items
          </ListGroup.Item>

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
              placeholder for order summary
            </ListGroup.Item>

            <ListGroup.Item>  
              <Button 
                onClick={(event) => {handlePlaceOrder(paymentMethod)}}
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
