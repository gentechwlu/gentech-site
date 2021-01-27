import React, {useState} from 'react';
import { Navbar, Nav, Button, NavDropdown} from 'react-bootstrap';
import '../App.css';
import JoinModal from './joinModal';

function Navigation() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" variant="dark">
        <Navbar.Brand href="/" style={{fontSize: "20px"}}>GenTech</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end" style={{paddingRight:"45px"}}>
            <Nav>
                <Nav.Link href="/about">About Us</Nav.Link>
                <NavDropdown  title="What we do" id="basic-nav-dropdown" className="nav-spacing">
                  <NavDropdown.Item href="/whatwedo/innovation-lab" style={{fontSize: "20px"}}>Innovation Lab</NavDropdown.Item>
                  <NavDropdown.Item href="/whatwedo/workshops" style={{fontSize: "20px"}}>Workshops</NavDropdown.Item>
                  <NavDropdown.Item href="/whatwedo/community-outreach" style={{fontSize: "20px"}}>Community Outreach</NavDropdown.Item>
                  <NavDropdown.Item href="/whatwedo/speaker-series" style={{fontSize: "20px"}}>Speaker Series</NavDropdown.Item>
                </NavDropdown>
                <Button variant="outline-light" onClick={() => setModalShow(true)}>Join Us</Button>
                <JoinModal show={modalShow} onHide={() => setModalShow(false)} />
            </Nav>
        </Navbar.Collapse>
  </Navbar>
  );
}

export default Navigation;
