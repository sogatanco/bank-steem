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
            selectedBank:'BNI',
            sbdPrice:0,
            steemPrice:0,
            fromValue:0,
            toValue:0
        }
      }

      componentDidMount(){
          this.timerID=setInterval(
              ()=>this.getPrice(),
              1000)
      }

      componentWillUnmount(){
          clearInterval(this.timerID);
      }

      change(){
          const from1=this.state.from;
          const fromlist1=this.state.fromlist;
          const to1=this.state.to;
          const tolist1=this.state.tolist;
          const fromValue1=this.state.fromValue;
          const toValue1=this.state.toValue;

          this.setState({
              from:to1,
              fromlist:tolist1,

              to:from1,
              tolist:fromlist1,

              fromValue:toValue1,
              toValue:fromValue1
          })
          
      }
      
      getPrice(){
        fetch('https://id-api.upbit.com/v1/ticker?markets=BTC-SBD')
        .then(response=>response.json())
        .then((data)=>{
            fetch('https://id-api.upbit.com/v1/ticker?markets=IDR-BTC')
            .then(responseb=>responseb.json())
            .then((btc)=>{
                this.setState({sbdPrice:data[0].trade_price*btc[0].trade_price})
            })  
        })

        fetch('https://id-api.upbit.com/v1/ticker?markets=BTC-STEEM')
        .then(response=>response.json())
        .then((data)=>{
            fetch('https://id-api.upbit.com/v1/ticker?markets=IDR-BTC')
            .then(responseb=>responseb.json())
            .then((btc)=>{
                this.setState({steemPrice:data[0].trade_price*btc[0].trade_price})
            })  
        })
        var hasil;
        if(this.state.from==='IDR'&& this.state.to==='STEEM'){
            hasil=this.state.fromValue/this.state.steemPrice;
        }else if(this.state.from==='IDR'&& this.state.to==='SBD'){
            hasil=this.state.fromValue/this.state.sbdPrice;
        }else if(this.state.from==='STEEM'&& this.state.to==='IDR'){
            hasil=this.state.fromValue*this.state.steemPrice;
        }else if(this.state.from==='SBD'&& this.state.to==='IDR'){
            hasil=this.state.fromValue*this.state.sbdPrice;
        }

        this.setState({toValue:hasil})
      }

      

    render(){
        // console.log(this.state.sbdPrice)
        // console.log(this.state.steemPrice)
        return(
            <> 
                 
                 <Container className="ml">
                     <Row className="mt-4 ">
                         <Col  className=" pl-4 pr-4 tr" md={5}>

                            <InputGroup className="mb-2">
                                <Form.Control id="from" value={this.state.fromValue}  onChange={(e) => this.setState({fromValue:e.target.value})}/>
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
                                <Form.Control id="to" value={this.state.toValue}  onChange={(e) => this.setState({toValue:e.target.value})}/>
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