import { Button } from "react-bootstrap";
import { useParams } from "react-router";

import { useState, useEffect} from "react";
import productActions from "../services/productAction";
import { useDispatch } from 'react-redux';
 
import { addCartItem } from "../services/cartAction";




function ProductScreen () {

  const { productId } = useParams();
  const [product, setProduct] = useState(undefined); 
  const dispatch = useDispatch();
     
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
    console.log(product)
    console.log(product.quantity)
  }


  const HandleAddToCart = (productId) => {
    dispatch(addCartItem(productId));
  }
  

        
  return (
    <div>
      <p>This is product screen.</p> 

      {product &&

      <Button onClick={
        () => {
          HandleAddToCart(productId);
        } 
      }
      disabled={product.quantity === '0'}
      >Add to Cart</Button> 

      }

    </div>

  )
}
  
export default ProductScreen;

