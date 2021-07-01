import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import '../Css/history.css';
import "firebase/auth";
import firebase from '../firebaseConfig';
import { Redirect } from "react-router-dom";

class History extends React.Component{

    constructor(){
        super();
        this.state={
            uid:'',
            tr:[],
            redi:false
        }
    }

    componentDidMount(){
         firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              var db=firebase.firestore().collection("/transactions");  
              db.get().then(snap=>{
                var dataall=[];
                snap.docs.forEach(snap=>{
                    if(snap.data().uid===user.uid){
                        dataall.push(snap.data())
                    }
                }) 
                dataall.sort(function(a,b){
                    return b.time - a.time;
                })
                this.setState({tr:dataall})

                  
              })

          } else {
            this.setState({redi:true})
          }
        });
    }

    render(){
        console.log(this.state.tr)
         
        if(this.state.redi){
            return(<Redirect to="/login"></Redirect>)
        }else{
            return(
                <>
                 <Container className="mt-4">
                     <Row className="justify-content-md-center mt-3">
                         <Col lg={8}>
                             <ul className="timeline">
                                 {this.state.tr.map(t=>(
                                     <li key={t.time}>
                                     <Row>
                                         <Col sm={6}>
                                         <span target="blank" className="d-flex justify-content-start "><b>{t.kind}</b></span>
                                         </Col>
                                         <Col sm={6}>
                                         <small target="blank" className="d-flex justify-content-end">{t.time}</small>
                                         </Col>
                                     </Row>
                                     {t.status==='pending'?<small className="text-danger">#{t.status}</small>:null}
                                     {t.status==='processing'?<small className="text-warning">#{t.status}</small>:null}
                                     {t.status==='success'?<small className="text-success">#{t.status}</small>:null}
                                     
                                     {t.kind==='IDR-STEEM'? <p>convert {t.value} IDR to {t.result} STEEM, The result will be send to @{t.username} with memo : {t.memo}</p>:null}
                                     {t.kind==='IDR-SBD'? <p>convert {t.value} IDR to {t.result} SBD, The result will be send to @{t.username} with memo : {t.memo}</p>:null}
                                     {t.kind==='SBD-IDR'? <p>convert {t.value} SBD to {t.result} IDR, The result will be send to {t.bank} {t.bankNumber} with name {t.bankName}</p>:null}
                                     
                                 </li>
                                 ))}
                             </ul>
                         </Col>
                     </Row>
                 </Container>
                </>
             )
        }
    }
}
export default History;