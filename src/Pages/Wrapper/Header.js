import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import '../../Css/header.css';
import "firebase/auth";
import firebase from '../../firebaseConfig'




class Header extends React.Component{

  constructor(){
    super();
    this.state={
        isLogged:false,
        phoneNumber:''
    }
  }

  componentDidMount(){ 
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              this.setState({phoneNumber:user.phoneNumber})

              var db=firebase.firestore().collection("/users");  
              db.doc(user.uid).set({
                uid:user.uid,
                phoneNumber:user.phoneNumber,
                lastLogin:new Date().toLocaleString()
              })

          } else {
            this.setState({phoneNumber:''})
          }
        });
  }

  logout(){
    firebase.auth().signOut();
  }

  

    render(){
   
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="tt">
              <Container>
              <Navbar.Brand href="#home">BANK STEEM</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="nv mr-auto">
                  <Nav.Link href="/" className="mx-3">Home</Nav.Link>
                  <Nav.Link href="/history" className="mx-3">Transaction History</Nav.Link>
                  <Nav.Link href="/about" className="mx-3">About</Nav.Link>
                  <Nav.Link href="#pricing" className="mx-3">Contact</Nav.Link>
                </Nav>
                <Nav className="mx-auto">
                  
                </Nav>
                <Nav className="ml-auto">
                
                {this.state.phoneNumber!==''?
                <>
                <NavDropdown title={this.state.phoneNumber} id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Setting</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item> 
                </NavDropdown>
                </>
                  :
                
                <Nav.Link href="/login" className="mx-3">Login</Nav.Link>
                }
                </Nav>
              </Navbar.Collapse>
              </Container>
            </Navbar>
        )
    }
}
export default Header;