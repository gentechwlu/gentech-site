import React, {useState} from 'react'
import { Container, Col, Row, Tabs, Tab } from 'react-bootstrap';
import AuthService from '../helpers/authService';
import EventManagement  from "../components/adminComponents/eventManagement";
import MembersList from '../components/adminComponents/membersList';

function Dashboard() {
    const[data, setData] = useState({user: AuthService.getCurrentUser()})
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 style={{color: "white", textAlign: "center", padding: "30px"}}>Hey, {AuthService.getUsername()}!</h1>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                <Row>
                    <Col>
                        <Tabs defaultActiveKey="events" className="justify-content-center">
                            <Tab eventKey="events" title="Events">
                                <EventManagement />
                            </Tab>
                            <Tab eventKey="members" title="Members">
                                <MembersList />
                            </Tab>
                    </Tabs>
                    </Col>
                </Row>
                
            </Container>
            
        </>
    )
}

export default Dashboard
