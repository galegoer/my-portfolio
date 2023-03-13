import React from 'react';
import { AiFillGithub, AiFillYoutube, AiFillLinkedin } from 'react-icons/ai';
import { FaDiscord } from 'react-icons/fa';
import SiteThemeSelector from './SiteThemeSelector';
import '../styles/Footer.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Footer = () => {
  
  return (
    <footer className="appFooter">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Nav className='me-auto'>
            <div className="footer-container">
              <SiteThemeSelector />
            </div>
          </Nav>
          <Nav className='d-flex flex-row'>
            <Nav.Link target="_blank" href="https://www.github.com/galegoer"><AiFillGithub style={{fontSize: "2.5em"}} /></Nav.Link>
            <Nav.Link className='ms-2' target="_blank" href="https://www.linkedin.com/eric-galego"><AiFillLinkedin style={{fontSize: "2.5em"}} /></Nav.Link>
            <Nav.Link className='ms-2' disabled target="_blank" href="https://www.discord.com"><FaDiscord style={{fontSize: "2.5em"}} /></Nav.Link>
            <Nav.Link className='ms-2' disabled target="_blank" href="https://www.youtube.com"><AiFillYoutube style={{fontSize: "2.5em"}} /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );
}

export default Footer;