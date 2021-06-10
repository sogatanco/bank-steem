import React from 'react';
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import '../../Css/header.css';

class Header extends React.Component{
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="tt">
              <Container>
              <Navbar.Brand href="#home">BANK STEEM</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="#features" className="mx-3">Home</Nav.Link>
                  <Nav.Link href="#pricing" className="mx-3">Transaction History</Nav.Link>
                  <Nav.Link href="#pricing" className="mx-3">About</Nav.Link>
                  <Nav.Link href="#pricing" className="mx-3">Contact</Nav.Link>
                </Nav>
                <Nav className="mx-auto">
                  
                </Nav>
                <Nav className="ml-auto">
                  <Nav.Link href="#features" className="mx-3">Login</Nav.Link>
                  <Nav.Link href="#pricing" className="mx-3">Register</Nav.Link>
                </Nav>
              </Navbar.Collapse>
              </Container>
            </Navbar>
        )
    }
}
export default Header;