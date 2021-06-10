import React from 'react';
import Header from './Wrapper/Header';
import {Col, Container, Row, InputGroup, Button, Form} from 'react-bootstrap';
import {FaExchangeAlt} from 'react-icons/fa';
import './../Css/home.css';



class Home extends React.Component{

    constructor(){
        super();
        this.state={
            fromlist:['IDR'],
            from:'IDR',
            to:'STEEM',
            tolist:['STEEM', 'SBD']
        }
      }

    render(){
        return(
            <div>
                 <Header/>
                 
                 <Container className="ml">
                     <Row className="mt-4 ">
                         <Col  className=" pl-4 pr-4 tr" md={5}>

                            <InputGroup className="mb-2">
                                <Form.Control id="iw" placeholder="Amount" />
                                <InputGroup.Prepend>
                                    <Form.Control as="select" value={this.state.in} onChange={e => this.setState({ from:e.target.value})}>
                                    {this.state.fromlist.map(opt => (
                                        <option key={opt}  value={opt}>{opt}</option>
                                    ))}
                                    </Form.Control>
                                </InputGroup.Prepend> 
                            </InputGroup>

                         </Col>

                         <Col className="pl-4 pr-4 tr text-center" md={2} >
                             <h2 className="text-muted"><FaExchangeAlt/></h2>
                         </Col>


                         <Col className="  pl-4 pr-4" md={5}>

                            <InputGroup className="mb-2">
                                <Form.Control id="i" placeholder="Amount" />
                                <InputGroup.Prepend>
                                    <Form.Control as="select" value={this.state.in} onChange={e => this.setState({ to:e.target.value})}>
                                        {this.state.tolist.map(opt => (
                                            <option key={opt}  value={opt}>{opt}</option>
                                        ))}
                                    </Form.Control>
                                </InputGroup.Prepend> 
                            </InputGroup>

                         </Col>

                     </Row>

                     <Row className="justify-content-md-center p-3 mt-4">
                         <Col lg={6}>
                             <h4 className="text-center">BANK ACCOUNT</h4>
                             <p className="text-center text-muted">input your bank account detail !</p>
                             <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <Form.Control as="select" >
                                            <option key="steem" value="steem">STEEM</option>
                                            <option key="sbd" value="sbd">SBD</option>
                                        </Form.Control>
                                    </InputGroup.Prepend> 
                                    <Form.Control id="e" placeholder="Amount" />
                                </InputGroup>
                            </Form.Group> 

                         </Col>
                     </Row>

                     <Row className="justify-content-md-center p-3">
                         <Col lg={6} >
                             <Form.Group>
                                <Form.Control id="h" placeholder="Amount" />
                            </Form.Group> 
                         </Col>
                     </Row>


                     <Row className="justify-content-md-center p-3">
                        <Col lg={6} className="submit" >
                            <Button variant="dark" className="float-end">SUBMIT TRANSACTION</Button>
                        </Col>
                     </Row>

                 </Container>
            </div>
           


        );
    }
}
export default Home;