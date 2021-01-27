import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import leadersList from "../leaders-list";
import {IoLogoLinkedin} from "react-icons/io";

function TheTeam() {
    return (
        <Container fluid>
            <Row>
                <Col style={{textAlign: "center", padding: "10px 0"}}>
                    <h1>Meet the team</h1>
                </Col>
            </Row>
            <Row className="leaders-grid">
                {leadersList.map((leader, key) => (
                    <Col className="leader" lg={3} md={3} xs={12} key={key}>
                        <Image src={process.env.PUBLIC_URL + leader.src} alt={leader.altText} roundedCircle/>
                        <h4 style={{textAlign: "center", marginTop:"10px"}}>{leader.name}<a href={leader.link}><IoLogoLinkedin size="30px" style={{color: "#3170ae"}}/></a></h4>
                        <h5 style={{margin: "0", fontWeight: "400"}}>{leader.position}</h5>
                    </Col>
                ))} 
            </Row>
        </Container>
    )
}

export default TheTeam
