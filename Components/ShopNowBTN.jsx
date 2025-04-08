import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ShopNowBTN() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/products');
  }

  return (
    <div className="ShopNowBTN">
    <Button variant="primary" onClick={handleClick} className="mt-3 btn-lg">
  Shop Now
</Button>
    </div>
  );
}

export default ShopNowBTN;