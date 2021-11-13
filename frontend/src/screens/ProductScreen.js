import { Button, Image, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";

import { useState, useEffect} from "react";
import productActions from "../services/productAction";
import { useDispatch } from 'react-redux';
 
import { addCartItem } from "../services/cartAction";




function ProductScreen () {

  const { productId } = useParams();
  const [product, setProduct] = useState(undefined); 
  const dispatch = useDispatch();
  var loading = true;
     
  console.log(productId)
  useEffect(() => {
    if(productId){
      productActions.getProductById(productId).then(response => {
          console.log(response)
          setProduct(response.data)
      })
    }
  }, [productId]) 

  // check the information of product
  if(product){
    loading = false;
    console.log(product)
    console.log(product.quantity)
  }


  const HandleAddToCart = (productId) => {
    if (product.quantity < 1) {
      window.alert("Out of Stock!\nYou cannot add this item to your cart.")
    } else {
      dispatch(addCartItem(productId));
    }
  }
  

  if (loading == true) {
    return (
      <h1>LOADING</h1>
    )
  } else {
    return (
      <div>
        <Row>
          <Col md={3}> 
            <Image src={product.image} alt={product.title} fluid></Image>
          </Col>

          <Col md={3}>
            <h1>{product.title}</h1>
            <h2>Price</h2>
            <p>${product.price}</p>

            <h2>Description</h2>
            <p>{product.description}</p>

            <h2>Category</h2>
            <p>{product.category}</p>

            <h2>Current Stock</h2>
            <p hidden={product.quantity > 0}>Out of Stock!</p>
            <p hidden={product.quantity < 1}>{product.quantity}</p>

            <h2>Seller</h2>
            <p>{product.seller}</p>
          </Col>

          <Col md={3}>
            {product &&

            <Button size="lg" onClick={
              () => {
                HandleAddToCart(productId);
              } 
            }
            >Add to Cart</Button> 

            }
          </Col>
        </Row>

      </div>

    )
  }
}
  
export default ProductScreen;

