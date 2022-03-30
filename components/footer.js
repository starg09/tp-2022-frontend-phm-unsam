import { Container, Navbar } from "react-bootstrap";
import { BsShop } from "react-icons/bs";

export default function Footer() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container className="justify-content-center rb-center">
          <Navbar.Brand><BsShop/> Difficult / 2022</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}
