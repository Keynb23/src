import React from 'react';
import { Offcanvas, Form } from 'react-bootstrap';

function Filter({ filter, onFilterChange, show, onHide, isOffcanvas = false }) {
  const categories = [
    { value: 'all', label: 'All' },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
    { value: 'jewelery', label: 'Accessories' }, // Note: API uses "jewelery" (misspelled)
    { value: 'electronics', label: 'Electronics' },
  ];

  const filterContent = (
    <Form.Group className="mb-3">
      <Form.Label>Filter by Category</Form.Label>
      <Form.Select value={filter} onChange={onFilterChange}>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );

  if (isOffcanvas) {
    return (
      <Offcanvas show={show} onHide={onHide} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{filterContent}</Offcanvas.Body>
      </Offcanvas>
    );
  }

  return <div className="filter-container">{filterContent}</div>;
}

export default Filter;