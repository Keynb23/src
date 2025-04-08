import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../Components/ProductCard';
import Filter from '../Components/Filter';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // Default to show all
  const [showFilter, setShowFilter] = useState(false); // For collapsible menu

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data); // Set initial filtered products to all
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
        console.error(error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    if (selectedFilter === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === selectedFilter);
      setFilteredProducts(filtered);
    }
    setShowFilter(false); // Close filter menu after selection
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="mt-5">
      <Row>
        {/* Filter Toggle Button for Mobile */}
        <Col xs={12} className="mb-3 d-lg-none">
          <Button variant="primary" onClick={() => setShowFilter(true)}>
            Filter Products
          </Button>
        </Col>

        {/* Sidebar Filter (hidden on mobile, visible on lg screens) */}
        <Col lg={3} className="d-none d-lg-block">
          <Filter filter={filter} onFilterChange={handleFilterChange} />
        </Col>

        {/* Product List */}
        <Col lg={9}>
          <h2>Our Products</h2>
          <Row>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col key={product.id} md={4} className="mb-4">
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <Col>
                <p>No products available for this filter.</p>
              </Col>
            )}
          </Row>
        </Col>
      </Row>

      {/* Offcanvas Filter for Mobile */}
      <Filter
        filter={filter}
        onFilterChange={handleFilterChange}
        show={showFilter}
        onHide={() => setShowFilter(false)}
        isOffcanvas={true}
      />
    </Container>
  );
}

export default ProductList;