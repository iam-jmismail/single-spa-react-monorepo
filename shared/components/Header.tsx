import { useAuth } from "@apps/client/src/context/AuthContext";
import { useCart } from "@apps/client/src/context/CartContext";
import React from "react";
import { Navbar, Nav, Container, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  const { getItemsCount } = useCart();
  const { isAuthenticated, handleLogout } = useAuth();

  const itemCount = getItemsCount();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          E-commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/cart">
                  Cart{" "}
                  {itemCount > 0 && (
                    <Badge bg="light" text="dark" className="ms-2">
                      {itemCount}
                    </Badge>
                  )}
                </Nav.Link>
                <Nav.Link as={Button} variant="link" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
