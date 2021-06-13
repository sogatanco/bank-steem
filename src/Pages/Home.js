import React from 'react';
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
            tolist:['STEEM', 'SBD'],
            bank:['BNI 46', 'BSI', 'BRI', 'BANK ACEH', 'MANDIRI', 'BCA', 'LINK AJA', 'DANA'],
            selectedBank:'BNI'
        }
      }

      change(){
          const from1=this.state.from;
          const fromlist1=this.state.fromlist;
          const to1=this.state.to;
          const tolist1=this.state.tolist;

          this.setState({
              from:to1,
              fromlist:tolist1,

              to:from1,
              tolist:fromlist1
          })
          
      } 

    render(){
        return(
            <>
                
                 
                 <Container className="ml">
                     <Row className="mt-4 ">
                         <Col  className=" pl-4 pr-4 tr" md={5}>

                            <InputGroup className="mb-2">
                                <Form.Control id="iw" placeholder="Amount" />
                                <InputGroup.Prepend>
                                    <Form.Control as="select" value={this.state.from} onChange={e => this.setState({ from:e.target.value})}>
                                    {this.state.fromlist.map(opt => (
                                        <option key={opt}  value={opt}>{opt}</option>
                                    ))}
                                    </Form.Control>
                                </InputGroup.Prepend> 
                            </InputGroup>

                         </Col>

                         <Col className="pl-4 pr-4 tr text-center" md={2}  >
                             <h2 className="text-muted" onClick={this.change.bind(this)}><FaExchangeAlt/></h2>
                         </Col>


                         <Col className="  pl-4 pr-4" md={5}>

                            <InputGroup className="mb-2">
                                <Form.Control id="i" placeholder="Amount" />
                                <InputGroup.Prepend>
                                    <Form.Control as="select" value={this.state.to} onChange={e => this.setState({ to:e.target.value})}>
                                        {this.state.tolist.map(opt => (
                                            <option key={opt}  value={opt}>{opt}</option>
                                        ))}
                                    </Form.Control>
                                </InputGroup.Prepend> 
                            </InputGroup>

                         </Col>

                     </Row>



                     {/* bank account detail */}
                    {this.state.from!=='IDR' &&
                        <>
                             <Row className="justify-content-md-center p-3 mt-4">
                                <Col lg={6}>
                                    <h4 className="text-center">BANK ACCOUNT</h4>
                                    <p className="text-center text-muted">input your bank account detail !</p>
                                    <Form.Group>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <Form.Control as="select" value={this.state.selectedBank} onChange={e=>this.setState({selectedBank:e.target.value})} >
                                                    {this.state.bank.map(opt=>(
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                                </Form.Control>
                                            </InputGroup.Prepend> 
                                            <Form.Control id="sdg" placeholder="account number" />
                                        </InputGroup>
                                    </Form.Group> 

                                </Col>
                            </Row>

                            <Row className="justify-content-md-center p-3">
                                <Col lg={6} >
                                    <Form.Group>
                                        <Form.Control id="sgd" placeholder="account name" />
                                    </Form.Group> 
                                </Col>
                            </Row>


                            <Row className="justify-content-md-center p-3">
                                <Col lg={6} className="submit" >
                                    <Button variant="dark" className="float-end">SUBMIT TRANSACTION</Button>
                                </Col>
                            </Row>
                        </>
                    }



                    {/* steemit account detail */}
                    {this.state.from==='IDR' &&
                        <>
                            <Row className="justify-content-md-center p-3 mt-4">
                                <Col lg={6}>
                                    <h4 className="text-center">STEEMIT ACCOUNT</h4>
                                    <p className="text-center text-muted">input your steemit account detail !</p>
                                    
                                    <Form.Group>
                                    <Form.Control id="hs" placeholder="account username" />
                                </Form.Group> 
                                </Col>
                                </Row>

                                <Row className="justify-content-md-center p-3">
                                <Col lg={6} >
                                    <Form.Group>
                                    <Form.Control id="hgs" placeholder="transfer memo" />
                                </Form.Group> 
                                </Col>
                                </Row>


                                <Row className="justify-content-md-center p-3">
                                <Col lg={6} className="submit" >
                                <Button variant="dark" className="float-end">SUBMIT TRANSACTION</Button>
                                </Col>
                                </Row>
                        </>
                    }



                 </Container>

            </>
           


        );
    }
}
export default Home;