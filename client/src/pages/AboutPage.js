import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const AboutPage = () => {
    return (
        <>
        <Container fluid>
            <Row>
                <Col>
                    <h1 style={{textAlign: "center", marginTop: "50px"}}>About Us</h1> 
                </Col>
            </Row>
            <Row style={{ marginBottom: "80px"}}>
                <Col className="about-content">
                    <p>
                    GenTech is a student-run organization at Washington and Lee 
                    University founded in 2020 to empower our community through 
                    technology. In a world where technology pervades nearly every
                     aspect of our lives – our club is committed to educating and
                      preparing students and the broader community to shape this world.
                    </p>
                    <br />
                    <p>
                    The organizational structure is divided into four verticals that contribute 
                    to the mission of GenTech: Innovation Lab, Workshops, Community Outreach, and
                     Speaker Series. Each vertical is uniquely designed to cater for any individual’s
                      needs. We aim to build a diverse and inclusive community, welcoming students from 
                      all disciplines to dive into the world of technology. Whether you are a beginner or 
                      an expert in tech, there is a place for YOU in our club.
                    </p>
                </Col>
            </Row >
        </Container>
           
        </>
    )
}

export default AboutPage
