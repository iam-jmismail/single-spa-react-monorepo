import React, { useState } from "react";
import { Col, Container, Row, Nav, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "./Header";
import { useAuth } from "@shared/context/AuthContext";

type Props = {
  children: React.ReactNode;
  isAdmin?: boolean;
};

const Layout = ({ children, isAdmin = false }: Props) => {
  const { handleLogout } = useAuth();
  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogoutUser = () => {};

  return (
    <div className="min-vh-100">
      {!isAdmin && <Header />}

      {/* Logout Modal */}
      <Modal show={logoutModal}>
        <Modal.Header> Logout </Modal.Header>
        <Modal.Body> Do you wish to logout?</Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => handleLogout()}>
            {" "}
            Logout
          </Button>
          <Button variant="light" onClick={() => setLogoutModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {isAdmin ? (
        <Row
          className="g-0"
          style={{
            minHeight: "100vh",
            minWidth: "200px",
          }}
        >
          <Col
            md={2}
            sm={12}
            lg={2}
            className="sidebar bg-dark text-light d-flex flex-column justify-content-between"
          >
            <Nav className="flex-column">
              <Nav.Item>
                <div className="text-center my-4 text-success">
                  Administrator
                </div>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/dashboard" className="text-light">
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
                  onClick={() => setLogoutModal(true)}
                >
                  Logout
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
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
