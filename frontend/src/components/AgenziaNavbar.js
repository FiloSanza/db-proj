import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const AgenziaNavbar = () => {
  return (
    <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand href="/">Agenzia</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/clienti">Clienti</Nav.Link>
        <Nav.Link href="/guide">Guide</Nav.Link>
        <Nav.Link href="/attivita">Attivita</Nav.Link>
        <Nav.Link href="/citta">Citta</Nav.Link>
        <Nav.Link href="/tag">Tag</Nav.Link>
        <Nav.Link href="/viaggio">Viaggio</Nav.Link>
        <Nav.Link href="/dataviaggio">DataViaggio</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  );
}

export default AgenziaNavbar;