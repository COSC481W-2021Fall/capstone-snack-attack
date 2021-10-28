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
    /*         <header className="row">
          <div>
            <a className="brand" href="/">
              CrossAmazon
            </a>
          </div>
          <div>
            <a href="/cart">Cart</a> */

    /*             {/* <a href="/productedit">Add Products</a> */

    /*             {
                (userInfo && userInfo.userrole === 'admin') ? (                    
                    <a href="/adminpanel">Store Manager</a>                                                
                ) : (
                    <a href="/customerpanel">Customer</a>
                )
            } */

    /*             {
              userInfo ? (
                <Button onClick={handleLogout}>Log out</Button>
              ) : (
                <a href="/login">Sign In</a>
              )
            } */

    /* {/*             {
                userInfo ? (
                    userInfo.userrole === 'admin' ? (
                        <a href="/adminpanel">Store Manager</a>
                        
                        // <Button onClick={handleLogout}>Log out</Button>
                        ) : (
                        <a href="/customerpanel">Customer</a>
                        )
                ) : (
                    <a href="/login">Log In</a>
                )
            }  */

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

                    {/* <LinkContainer to="/editproduct">
                      <NavDropdown.Item>Edit Products</NavDropdown.Item>
                    </LinkContainer> */}

                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <NavDropdown title="Customer" id="admin">
                    {/*                                         <LinkContainer to="/customerpanel">
                                            <NavDropdown.Item>Panel</NavDropdown.Item>
                                        </LinkContainer> */}

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
