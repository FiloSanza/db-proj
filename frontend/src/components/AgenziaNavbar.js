import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
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
          <Nav.Link href="/aggiunta">Aggiunta</Nav.Link>
          <NavDropdown title="Viaggi">
            <NavDropdown.Item href="/viaggio">Crea</NavDropdown.Item>
            <NavDropdown.Item href="/listviaggi">Vedi Tutti</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/dataviaggio">Date Viaggio</Nav.Link>
          <Nav.Link href="/prenotazione">Prenotazione</Nav.Link>
          <Nav.Link href="/recensione">Recensione</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AgenziaNavbar;