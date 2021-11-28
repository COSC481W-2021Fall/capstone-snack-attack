import React, { useEffect, useAlert } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {myOrders} from '../services/orderAction';
//import UserAction from '../services/userAction';

function OrderListScreen({history}) {
    
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state=> state.myOrders);
    //const orderList = useSelector((state) => state.myOrders)
    //const { loading, error, orders } = orderList;
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
      let customerId;
      if (userInfo && userInfo.userrole === "customer") {
        customerId = userInfo._id;
        dispatch(myOrders());
      }
    }, [dispatch, history, userInfo]);
   /* useEffect(() => {
        dispatch(myOrders());
    if(error) {
        alert.error(error);
        dispatch("this is new error")
        }
    }, [dispatch, alert, error]);*/

    

   return (
    <>
       <h1>Orders</h1>

       {loading ? (
        <h1>Loading...</h1> 
      ) : (
        <Table striped bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.username}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
   )
}
export default OrderListScreen;