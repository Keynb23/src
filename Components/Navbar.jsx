import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
      <BootstrapNavbar>
        <Container>
          <BootstrapNavbar.Brand as={Link} to="/">Fake Store</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/add-product">Add Product</Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
}

export default Navbar;