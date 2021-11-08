import React from "react";
import { useSelector } from "react-redux";

export default function CartScreen () {
  const cartItemsInfo = useSelector((state) => state.cart);
  const { cartItems } = cartItemsInfo;

  // check the products in the cart
  console.log(cartItems)
    
  return (
    <div>
      This is cart screen.

    </div>
  )
  }