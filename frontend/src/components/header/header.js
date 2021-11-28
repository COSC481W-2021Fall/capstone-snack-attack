import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { USER_LOGOUT } from "../../constants/userConstants";
// import { Button } from "@material-ui/core";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");

    dispatch({
      type: USER_LOGOUT,
    });
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (


    <header>
      <Navbar bg="dark" variant="dark" expand="xl" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>CrossAmazon</Navbar.Brand>
          </LinkContainer>

          <Nav>
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>
            </LinkContainer>
            <Navbar.Collapse id="basic-navbar-nav">
              {userInfo ? (
                userInfo.userrole === "admin" ? (
                  <NavDropdown title="Store Manager" id="admin">
                    <LinkContainer to="/addproduct">
                      <NavDropdown.Item>Add Products</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown title="Customer" id="admin">
                    
                    <LinkContainer to="/orderList">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                )
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
