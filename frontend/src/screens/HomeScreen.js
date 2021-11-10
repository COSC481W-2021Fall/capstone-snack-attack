/*
import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../services/productAction';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, []);

  return (
    <div>
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
*/
/* import { useSelector } from "react-redux";

function CheckInfo ({userInfo}){
  if(userInfo){
    return <h1>Got info</h1>
  }

  return <h1>Didn't get info</h1>
} */
import ProductsList from "../components/ProductList";

export default function HomeScreen () {

/*   const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;


  console.log(userInfo); */
  // console.log(userInfo.username);


   
  return (

    <div>
      
      <ProductsList/>
     {/* {< CheckInfo userInfo={userInfo} />}      */}
 
    </div>
  )
}

