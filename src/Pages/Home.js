import React from 'react';
import {Col, Container, Row, InputGroup, Button, Form, Modal} from 'react-bootstrap';
import {FaExchangeAlt} from 'react-icons/fa';
import './../Css/home.css';
import "firebase/auth";
import firebase from '../firebaseConfig'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import QRCode from "react-qr-code";



class Home extends React.Component{

    constructor(){
        super();
        this.state={
            fromlist:['IDR'],
            from:'IDR',
            to:'STEEM',
            tolist:['STEEM', 'SBD'],
            bank:['BNI46', 'BSI', 'BRI', 'BANK ACEH', 'MANDIRI', 'BCA', 'LINK AJA', 'DANA'],
            selectedBank:'BNI46',
            sbdPrice:0,
            steemPrice:0,
            fromValue:0,
            toValue:0,
            
            bankNumber:'',
            bankName:'',

            username:'',
            memo:'',

            show:false,
            show1:false,

            copied:false
        }

        this.submit = this.submit.bind(this)
        this.transfer=this.transfer.bind(this)
        this.handleClose=this.handleClose.bind(this)
      }

      componentDidMount(){
          this.timerID=setInterval(
              ()=>this.getPrice(),
              1000)
      }

      componentWillUnmount(){
          clearInterval(this.timerID);
      }

      transfer(link){
        window.location.assign(link)
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
            hasil=hasil-(hasil*0.02)
        }else if(this.state.from==='IDR'&& this.state.to==='SBD'){
            hasil=this.state.fromValue/this.state.sbdPrice;
            hasil=hasil-(hasil*0.02)
        }else if(this.state.from==='STEEM'&& this.state.to==='IDR'){
            hasil=this.state.fromValue*this.state.steemPrice;
            hasil=hasil-(hasil*0.02)
        }else if(this.state.from==='SBD'&& this.state.to==='IDR'){
            hasil=this.state.fromValue*this.state.sbdPrice;
            hasil=hasil-(hasil*0.02)
        }

        this.setState({toValue:hasil})
      }

      submit(){

        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                
              if(this.state.from==='IDR' ){
                  if(this.state.fromValue!==0 && this.state.toValue!==0 && this.state.username!=='' && this.state.memo!==''){
                    var db=firebase.firestore().collection("/transactions");
                    db.add({
                        uid:user.uid,
                        time:new Date().toLocaleString(),
                        kind:this.state.from+"-"+this.state.to,
                        value:this.state.fromValue,
                        result:this.state.toValue,
                        username:this.state.username,
                        memo:this.state.memo
                    }).then(()=>{
                        this.setState({show:true})
                    })

                    
                  }else{
                      alert('Please fill empty field !!')
                  }
              }else{
                if(this.state.fromValue!==0 && this.state.toValue!==0 && this.state.bankNumber!=='' && this.state.bankName!==''){
                    this.setState({show1:true, memo:this.state.from+"-"+user.uid})
                }else{
                    alert('Please fill empty field !!')
                }
              }
            }else{
                alert('Please Login First !!')      
            }
        })

      }

      handleClose(){
          this.setState({show:false})
          this.setState({show1:false})
      }

      

    render(){
        
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
                                            <Form.Control id="accountNumber" placeholder="account number" value={this.state.bankNumber}  onChange={(e) => this.setState({bankNumber:e.target.value})}/>
                                        </InputGroup>
                                    </Form.Group> 

                                </Col>
                            </Row>

                            <Row className="justify-content-md-center p-3">
                                <Col lg={6} >
                                    <Form.Group>
                                        <Form.Control id="accountName" placeholder="account name" value={this.state.bankName}  onChange={(e) => this.setState({bankName:e.target.value})}/>
                                    </Form.Group> 
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
                                    <Form.Control id="username" placeholder="account username" value={this.state.username}  onChange={(e) => this.setState({username:e.target.value})}/>
                                </Form.Group> 
                                </Col>
                                </Row>

                                <Row className="justify-content-md-center p-3">
                                <Col lg={6} >
                                    <Form.Group>
                                    <Form.Control id="memo" placeholder="transfer memo" value={this.state.memo}  onChange={(e) => this.setState({memo:e.target.value})} />
                                </Form.Group> 
                                </Col>
                                </Row>


                               
                        </>
                    }

                    <Row className="justify-content-md-center p-3">
                        <Col lg={6} className="submit" >
                        <Button variant="dark" className="float-end" onClick={this.submit}>SUBMIT TRANSACTION</Button>
                        </Col>
                    </Row>


                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Body>
                            <h4 className="text-center">Deposit Instruction</h4>
                            <hr></hr>
                            <p className="text-center">Please Transfer Rp {this.state.fromValue} to :<br></br><br></br> <b>BNI 0590621398</b><br></br>a/n Wahyudin <br></br><br></br> <b>BSI 8513619450</b><br></br>a/n Wahyudin</p>
                            <br></br>
                            <small ><i>*It will take 15 minutes for admin confirmation</i></small>
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.show1} onHide={this.handleClose}>
                        <Modal.Body>
                            <h4 className="text-center">Deposit Instruction</h4>
                            <hr></hr>
                            <p className="text-center">Please Transfer {parseFloat(this.state.fromValue).toFixed(2)} {this.state.from} to :</p>
                            
                            <div className="p-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>username</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                    value="sogata"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    readOnly/>
                                    <InputGroup.Append>
                                        <CopyToClipboard text="sogata" onCopy={() => this.setState({copied: true})}>
                                            <Button variant="secondary">Copy</Button>
                                        </CopyToClipboard>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>memo</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                    value={this.state.memo}
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    readOnly/>
                                    <InputGroup.Append>
                                        <CopyToClipboard text={this.state.memo} onCopy={() => this.setState({copied: true})}>
                                            <Button variant="secondary">Copy</Button>
                                        </CopyToClipboard>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>

                            <Row className="justify-content-md-center">
                                <Col lg="4">
                                    <QRCode className="align-content-center" size="124" value={"https://steemlogin.com/sign/transfer?to=sogata&amount="+this.state.fromValue+"%20"+this.state.from+"&memo="+this.state.memo} />
                                </Col>
                            </Row>

                            <div className="d-grid gap-2 mt-4">
                                <Button href={"https://steemlogin.com/sign/transfer?to=sogata&amount="+this.state.fromValue+"%20"+this.state.from+"&memo="+this.state.memo} target="blank" variant="dark">
                                    SteemConnect Transfer
                                </Button>
                                
                            </div>

                            </div>
                            
                        </Modal.Body>
                    </Modal>

                 </Container>

            </>
           


        );
    }
}
export default Home;