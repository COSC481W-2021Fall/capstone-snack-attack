import React, { useParams, useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import UserActions from "../services/userAction";

export default function AdminProductListScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [adminProducts, setAdminProduct] = useState([]);

  let adminId;
  if (userInfo && (userInfo.userrole === 'admin')){ 
      adminId = userInfo._id;
  }
  console.log(adminId);

  useEffect(() => {
    if (adminId) {
      UserActions.getAdminProductList(adminId).then((response) => {
        console.log(response.data);
        setAdminProduct(response.data);
      });
    }
  }, []);

  // console.log(UserActions.getAdminProductList(adminId));

  if (!userInfo || !(userInfo.userrole === 'admin')){
    return (
        <div>Please sign in as a store manager first.</div>
    )
  } 
  else {
    return (
      <>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>
        </Row>

        {
          <>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>QUANTITY</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {adminProducts.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        }
      </>
    );
  }
}
