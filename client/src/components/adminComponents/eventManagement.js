import React, {useEffect, useState} from 'react';
import { Container, Row, Col, Button, Card, CardColumns, Alert, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { GoCalendar, GoLocation, GoClock } from 'react-icons/go';
import EventModal from '../adminComponents/eventModal';

const EventManagement = () => {
    const [eventsList, setEvents] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModalData] = useState({event: {}})
    const [refreshKey, setRefreshKey] = useState(0);
    const [error, setError] = useState(false);
    const [table, setTable] = useState({show: false, event: {}});

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('../api/events');
            const body = await result.json();
            setEvents(body);
        }
        fetchData();
    }, [refreshKey])

    const deleteEvent = async (eventToDelete) => {
        const result = await fetch(`/api/events/${eventToDelete}/delete`);
        const body = await result.json();
        if (body.success) {
            refresh();
        } else {

        }

    }

    const refresh = () => setRefreshKey(oldKey => oldKey + 1)

    const Cards = () => {
        if (eventsList.length === 0) {
            return (
                <p style={{textAlign: "center", fontSize: "30px"}}>No new events. Click 'Add New' to create one!</p>
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
                            </Card.Body>
                            <Card.Footer>
                                <h6>Created by: {(event.createdBy)}</h6>
                            </Card.Footer>
                            <Card.Footer>
                            <Button variant="info" onClick={() => {
                                    setTable({event: event, show: true});
                                    }}>
                                    Show RSVPs
                                </Button>
                                {' '}
                                <Button variant="danger" onClick={() => {
                                    deleteEvent(event._id)
                                    refresh();
                                    }}>
                                    Delete Event
                                </Button>

                            </Card.Footer>
                            
                            
                        </Card>
                        
                        ))}
                        
                </CardColumns>
            );
        }
    }

    const DeleteError = () => {
        if (error) {
          return (
            <Alert variant="danger" onClose={() => setError(false)} dismissible>
              <Alert.Heading>Error: Delete Failed</Alert.Heading>
              <p>
                Something went wrong. Please refresh the page and try again. If the error persists, shoot us an email!
              </p>
            </Alert>
          );
        } else {
             return null
        }
      }

    const RsvpTable = () => {
        if (table.show) {
            return (
                <ListGroup className="m-auto">
                    <ListGroupItem variant="dark">
                        <strong>Event Name: </strong>{table.event.name}
                    </ListGroupItem>
                    <ListGroupItem variant="light">
                        {table.event.rsvp.length} people have signed up!
                    </ListGroupItem>
                        {table.event.rsvp.map((email) => (
                                <ListGroupItem>
                                    {email}
                                </ListGroupItem>
                            ))
                        }
                    
                </ListGroup>
            )
        } else {
            return null
        }
    }

    return (
        <Container fluid>
            <Row>
                <Col className="container-title">
                    <h1>Upcoming Events</h1>
                </Col>
                <Col >
                    <Button variant="primary" style={{float: 'right', margin: "10px"}} onClick={() => setModalShow(true)}>Add New</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DeleteError />
                    <Cards/>
                    <EventModal refresh={refresh} show={modalShow} event={modalData.event} onHide={() => setModalShow(false)} />
                </Col>
            </Row>
            <Row>
                <RsvpTable />
            </Row>
        </Container>
    )
}

export default EventManagement;