import React, { useState, useEffect } from "react";
import UserActions from "../services/userAction";
import ProductActions from "../services/productAction";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";

const ProductEditScreen = ({ match, res }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const adminId = userInfo._id;

  const productId = match.params.productId;

  // const product = ProductActions.getProductById(productId);
  const [product, setProduct] = useState([]);
  const [TitleValue, setTitleValue] = useState();
  const [DescriptionValue, setDescriptionValue] = useState();
  const [PriceValue, setPriceValue] = useState();
  const [QuantityValue, setQuantityValue] = useState();
  const [CategoryValue, setCategoryValue] = useState();

  useEffect(() => {
    if (productId) {
      ProductActions.getProductById(productId).then((response) => {
        setProduct(response.data);
        setTitleValue(response.data.title);
        setDescriptionValue(response.data.description);
        setPriceValue(response.data.price);
        setQuantityValue(response.data.quantity);
        setCategoryValue(response.data.category);
      });
    }
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    const variables = {
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      quantity: QuantityValue,
      category: CategoryValue,
    };
    console.log(variables);

    UserActions.updateProduct(productId, variables).then((response) => {
      console.log(2);

      if (response.data.success === "false") {
        alert(response.data.error);
      } else {
        alert("Product Successfully Updated");
      }
    });
  };

  return (
    <>
      <Link to={`/admin/productlist/${adminId}`} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>

        <Form onSubmit={onSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              defaultValue={product.title}
              onChange={(e) => setTitleValue(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              defaultValue={product.price}
              onChange={(e) => setPriceValue(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="quantity">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              defaultValue={product.quantity}
              onChange={(e) => setQuantityValue(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              defaultValue={product.category}
              onChange={(e) => setCategoryValue(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              defaultValue={product.description}
              onChange={(e) => setDescriptionValue(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
