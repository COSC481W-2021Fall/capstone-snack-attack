import React, { useEffect, useAlert, useState, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import OrderAction from "../services/orderAction";
import userAction from "../services/userAction";
import { Link, useHistory } from "react-router-dom";

function OrderListScreen() {

  const dispatch = useDispatch();
  const history = useHistory();
  
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [orders, setOrders] = useState([]);
  let customerId;

  useEffect(() => {
      retrieveOrders();
  }, []);

  if(userInfo){
      customerId = userInfo._id;
  }

  /*const shippingDetails = shipping && `${shipping.address}, 
                          ${shipping.city},${shipping.state},
                           ${shipping.zipcode}`*/

  const retrieveOrders = () => {
      OrderAction.getOrdersByCustomerId(customerId)
          .then(response => {
              console.log(response);

              setOrders(response.data);

          })
          .catch(e => {
              console.log(e);
          });
  };

if (!userInfo || !(userInfo.userrole === 'customer')){
    return (
        <div>Please sign in first.</div>
    )
} 
else if (!orders) {
    return (
        <div>There are no orders.</div>
    )
}
else {
    console.log(orders);
    return (
         <>
        <h1>Orders</h1>
         
          <Table striped bordered hover className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>TOTAL</th>
                <th>NO. OF ITEMS</th>
               
                <th></th>
              </tr>
            </thead>
            <tbody>

              {orders.map((order) => (
                <tr key={order._id} >
                  <td>{order._id}</td>
                  <td>{order.shipping.name}</td>
                  <td>${order.amount}</td>
                  <td>{order.items.length}</td>
                  
                  <td>
                    
                      <Button href={`#${order._id}`} variant="light" className="btn-sm">
                        Details
                      </Button>
                    
                  </td>
                </tr>
                    ))}
            </tbody>
          </Table>
        <Fragment>
        {orders.map((order) => (
            <><h1 className="my-5" id={order._id}> Order # {order._id}</h1>
              <h4 className="mb-4"> Shipping Info</h4>
              <p><b>Name: {order.shipping.name}</b></p>
              <p className="mb-4">
                <h4>Address:{order.shipping.address},{order.shipping.city}, 
                          {order.shipping.state} {order.shipping.zipcode}</h4>
              </p>
              <p><b>Total price: {order.amount}</b></p>

              <h4 className="mb-4"> Order Items:</h4>
              <hr/>
              <div>
                {order.items.map(
                   (item) => {
                    return (
                      <div className="row my-5">
                        <div className="col-4 col-lg-2">
                           <img size="small" src={item.image} alt={item.title} height="45" width="65" />
                        </div>
                        <div className="col-5 col-lg-5"><p>{item.title}</p></div>
                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                          <p>Price: ${item.price}</p>
                        </div>
                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>Quantity: {item.qty}</p>
                        </div>
                      </div>
                      )
                   }
                )
                }
                
              </div>
              
              
            </>  
        ))}
        </Fragment>
      </>
    )
  }  
} 
export default OrderListScreen;