import React from 'react';
import {Navbar, Container, Row, Col, Nav} from 'react-bootstrap';
import '../../Css/header.css';

class Footer extends React.Component{
    render(){
        return(
            <Navbar fixed="bottom"  >
                <Container className="nn">
                    <Nav className="mx-auto">
                        <small>Made with <span className="text-danger">&hearts;</span> by @sogata</small>
                    </Nav>
                </Container>
            </Navbar>
        )
    }
}
export default Footer;