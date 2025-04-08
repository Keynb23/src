import { Container } from 'react-bootstrap';
import ShopNowBTN from '../Components/ShopNowBTN';

function Home() {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to the Fake Store</h1>
      <p>Your one-stop shop for all things fake!</p>
      <ShopNowBTN />
    </Container>
  );
}

export default Home;