import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function NavBar() {
    
    return (
      <div style={{'height': '5rem'}}>
      <Navbar fixed='top' collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Eric Galego</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/song-rec">Song Recommendation</Nav.Link>
              <Nav.Link href="#features">Game 1 (TBD)</Nav.Link>
              <Nav.Link href="#pricing"></Nav.Link>
              <NavDropdown title="Temp Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action">Something</NavDropdown.Item>
                
                <NavDropdown.Divider />
                
                <NavDropdown.Item href="#action">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="/chat">Chat Rooms</Nav.Link>
              <Nav.Link eventKey={2} href="#temp">Temp</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </div>
    );
}

export default NavBar;