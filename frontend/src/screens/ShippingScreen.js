import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";

import { saveShippingAddress } from "../services/cartAction";

const ShippingAddress = ({ history }) => {
  //pull data from the Store.js (state.cart)
  //assume that we will have the info comes here
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  //state for data updated by form onChange actions.
  const [name, setName] = useState(shippingAddress.name);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [zipcode, setZipcode] = useState(shippingAddress.zipcode);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ name, address, city, state, zipcode }));

    // history.push("/payment");
  };

  return (
    <FormContainer>
      <h1>Shipping Address</h1>
      <Form onSumit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Contorl
            type="text"
            placeholder="Enter name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Contorl>
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            //
            // initial value from useState
            value={address}
            required
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
            value={city}
            required
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
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="zipcode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter zipcode"
            //
            // initial value from useState
            value={zipcode}
            required
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

export default ShippingAddress;
