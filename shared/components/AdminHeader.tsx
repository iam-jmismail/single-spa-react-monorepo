import { useAuth } from "@shared/context/AuthContext";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const { isAuthenticated, handleLogout } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/orders">
          E-commerce Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                {/* <Nav.Link as={Link} to="/signup">
                  Register
                </Nav.Link> */}
              </>
            ) : (
              <>
                <Nav.Link
                  as={Button}
                  variant="link"
                  onClick={() => handleLogout(true)}
                >
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

export default AdminHeader;
