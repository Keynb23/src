import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
    } catch (error) {
        setError('Failed to fetch product. Please try again later.');
        console.error('Fetch error:', error.response ? error.response.data : error.message);
        setLoading(false);
    }
    };
    fetchProduct();
  }, [id]); // Dependency array is correct

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      navigate('/products');
    } catch (error) {
      setError('Failed to delete product. Please try again later.');
      console.error(error);
    }
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

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <h1>Product not found</h1>
      </Container>
    );
  }

  return (
    <div className="ProductDetailsEdit">
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <img src={product.image} alt={product.title} className="img-fluid" />
        </Col>
        <Col md={6}>
          <h1>{product.title}</h1>
          <p>${product.price}</p>
          <p>{product.description}</p>
          <div className='EditButton'>
          <Button variant="primary" onClick={() => navigate(`/edit-product/${id}`)}>
            Edit
          </Button>{' '}
          </div>
          <div className='DeleteButton'>
            <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
            Delete
            </Button>
          </div>
        </Col>
      </Row>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    </div>
  );
}

export default ProductDetails;