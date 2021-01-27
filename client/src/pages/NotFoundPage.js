import React from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NotFoundPage() {
    return (
        <Container fluid>
            <Row style={{padding: "100px 0"}}>
                <Col className="m-auto">
                    <h1 style={{textAlign: "center"}}>PAGE NOT FOUND</h1>
                    <h5 style={{textAlign: "center"}}>The page you have requested does not exist. Click below to go back to the homepage.</h5>
                    <br />
                    <Link to={"/"}>
                        <Button variant="outline-dark" size="lg" className="mx-auto d-block">
                            Go Home
                        </Button>
                    </Link>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default NotFoundPage
