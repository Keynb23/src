import { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: 'https://fakestoreapi.com/products/:id/image', // Default image for simplicity
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Response = await axios.post('https://fakestoreapi.com/products', formData);
      setSuccess('Product added successfully!');
      setError('');
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (err) {
      setError('Failed to add product. Please try again.');
      setSuccess('');
      console.error(err);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Add New Product</h2>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
}

export default AddProduct;