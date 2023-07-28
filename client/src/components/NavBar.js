import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SiteThemeSelector from './SiteThemeSelector';


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
                <Nav.Link href="/chat">Chat Rooms</Nav.Link>
                <Nav.Link href="/battleship">BattleShip</Nav.Link>
                <Nav.Link href="/canvas">Number Detector</Nav.Link>
              </Nav>
              <Nav>
                <SiteThemeSelector />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
}

export default NavBar;