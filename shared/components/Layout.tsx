import React from "react";
import { Col, Container, Row, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "@shared/context/AuthContext";

type Props = {
  children: React.ReactNode;
  isAdmin?: boolean;
};

const Layout = ({ children, isAdmin = false }: Props) => {
  const { handleLogout } = useAuth();
  return (
    <div className="min-vh-100">
      {!isAdmin && <Header />}

      {isAdmin ? (
        <Row className="g-0">
          <Col
            md={2}
            sm={2}
            lg={2}
            className="sidebar bg-dark text-light d-flex flex-column justify-content-between p-3"
          >
            <Nav className="flex-column">
              <Nav.Item>
                <Nav.Link as={Link} to="/orders" className="text-light">
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/orders" className="text-light">
                  Orders
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/products" className="text-light">
                  Products
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Button}
                  variant="link"
                  onClick={() => handleLogout(true)}
                >
                  Logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={10}>
            <Container className="my-4">{children}</Container>
          </Col>
        </Row>
      ) : (
        <Container className="my-4">{children}</Container>
      )}
    </div>
  );
};

export default Layout;
