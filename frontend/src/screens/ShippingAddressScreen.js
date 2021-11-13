import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../services/cartAction";

const ShippingAddressScreen = () => {
  //
  // pull put data from Store (state.cart)
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  console.log(shippingAddress);

  //state for data updated by form onChange actions
  const [name, setName] = useState(shippingAddress.name);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [zipcode, setZipcode] = useState(shippingAddress.zipcode);

  //
  const dispatch = useDispatch();
  const history = useHistory();

  function validateInput(str) {
    var validateInput = true;
    if (/[!@#$%^&*(),.?":{}|<>]/g.test(str) || /\d+/g.test(str)) {
      validateInput = false;
    }
    return validateInput;
  }
  const submitHandler = (e) => {
    e.preventDefault();

    if (validateInput(name) && validateInput(state) && validateInput(city)) {
      // console.log("pass");

      dispatch(saveShippingAddress({ name, address, city, state, zipcode }));
      // console.log(shippingAddress);
      // console.log(cart);

      history.push("/payment");
    } else {
      alert("Invalid Input. Names, City and State do not allow numbers and special symbols!");
    }
  };

  return (
    <FormContainer>
      {/* <CheckoutSteps step1 step2 /> */}
      <h1>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            //
            // initial value from useState
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            //
            // initial value from useState
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            //
            // initial value from useState
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter state"
            //
            // initial value from useState
            required
            value={state}
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="zipcode">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter zipcode"
            //
            // initial value from useState
            required
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingAddressScreen;
