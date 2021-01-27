import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Card, CardColumns, Button } from 'react-bootstrap';
import RsvpModal from '../components/rsvpModal';
import { GoCalendar, GoLocation, GoClock } from 'react-icons/go';


const Events = () => {
    const [eventsList, setEvents] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({event: {name: ""}})

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('api/events');
            const body = await result.json();
            setEvents(body);
        }
        fetchData();
    }, [])

    const Cards = () => {
        if (eventsList.length === 0) {
            return (
                <p style={{textAlign: "center", fontSize: "30px"}}>No new events. Check again soon!</p>
            );
        } else {
            return (
                <CardColumns className="scroll">
                    {eventsList.map((event, key) => (
                        <Card style={{ width: '21rem', marginRight: '20px', backgroundColor: "#3170ae" }} key={key}>
                            <Card.Body>
                                <Card.Title>{event.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-info"><GoCalendar /> {event.date}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-info"><GoClock /> {event.time}</Card.Subtitle>
                                <Card.Subtitle className="mb-2 text-info"><GoLocation /> {event.location}</Card.Subtitle>
                                <Card.Text style={{ height: '300px', overflowY :'auto' }}>
                                    {event.description}
                                </Card.Text>
                                <Button variant="outline-light" onClick={() => {
                                    setModalData({event: event});
                                    setModalShow(true);
                                    }}>RSVP</Button>
                            </Card.Body>
                            
                        </Card>
                        
                        ))}
                        <RsvpModal show={modalShow} event={modalData.event} onHide={() => setModalShow(false)} />
                </CardColumns>
            );
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col className="container-title">
                    <h1>Upcoming Events</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Cards />
                </Col>
            </Row>
                
        </Container>
            
    )
}

export default Events;
