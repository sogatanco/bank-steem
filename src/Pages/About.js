import React from 'react';
import { Container, Row, Col, ListGroup, Button} from 'react-bootstrap';
import './../Css/about.css';

class About extends React.Component{
    render(){
        return(
            <div className="about">
                <Container className="pt-4">
                    <Row> 
                        <Col md={8} className="p-4">
                            <h4>About BS</h4>
                            <p className="text-justify">BS ( Bank STEEM ) is a web-based swap application that I plan to develop in the near future. where later in this application, steemit users from Indonesia can easily buy steem or SBD with rupiah, and vice versa. For now, BS is also available in the form of an android application. You can try downloading at the link provided below.</p>
                            <p className="text-justify">BS is one of the sub-projects of the Promosteem Community. BS was built on the basis of helping steemit users to make STEEM or SBD exchange transactions. For now, BS is only available for exchange with IDR. Other countries' currencies are still under development.</p>
                            <p className="text-justify">BS was introduced since June 1, 2021 and officially launched on July 1, 2021. Prior to the launch, it had been through discussions with country representatives of Indonesia. On their advice and guidance this application was formed.</p>
                            <br></br>
                            <h4>Why do you have to transact on BS?</h4>
                            <ul>
                                <li>Cheapest commission</li>
                                <li>No withdrawal fees</li>
                                <li>Secure transactions</li>
                                <li>Fast transaction</li>
                            </ul>
                        </Col>
                        <Col md={4} className="p-4">
                            <h4>Our Sponsors</h4>
                            <ListGroup variant="flush">
                            <ListGroup.Item>Promosteem Teams</ListGroup.Item>
                            <ListGroup.Item>Indonesia Country Reps</ListGroup.Item>
                            <ListGroup.Item>@steemcurator01</ListGroup.Item>
                            <ListGroup.Item>@booming</ListGroup.Item>
                            <ListGroup.Item>@stephenkendal</ListGroup.Item>
                            <ListGroup.Item>@pennsif</ListGroup.Item>
                            </ListGroup>

                            <br></br>
                            <br></br>

                            <div className="d-grid gap-2">
                                <Button href="https://drive.google.com/file/d/11LtKNO0KWTvrGaSLB1obFwmTNBUCi1e5/view?usp=sharing" variant="secondary" size="lg">
                                    Download Android App here
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default About;