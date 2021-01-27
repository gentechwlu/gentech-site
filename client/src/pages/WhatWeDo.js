import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import NotFoundPage from './NotFoundPage';
import whatWeDoList from "../whatWeDoList";
import Typist from 'react-typist';


function WhatWeDo({match}) {
    const name = match.params.name;
    const thingWeDo = whatWeDoList.find(thing => thing.name === name)

    if (!thingWeDo) return <NotFoundPage />
    return (
        <Container fluid>
            <Row style={{marginTop:"50px"}}>
                <Col>
                    <h1 style={{textAlign: "center"}}>
                        {thingWeDo.title}
                    </h1>
                </Col>
            </Row>
            <Row style={{ marginBottom: "100px"}}>
                <Col className="wwd-content">
                        {thingWeDo.description.map(paragraph => {
                            return (
                            <p>
                                {paragraph}
                            </p>)
                        })}
                    
                </Col>
            </Row>

        </Container>
    )
}

export default WhatWeDo;