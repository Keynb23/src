import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
    return (
      <Card className="mb-4 ProductCard">
        <Card.Img variant="top" src={product.image} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>${product.price}</Card.Text>
          <Link to={`/products/${product.id}`} className="btn btn-primary">
            View Details
          </Link>
        </Card.Body>
      </Card>
    );
  }
export default ProductCard;