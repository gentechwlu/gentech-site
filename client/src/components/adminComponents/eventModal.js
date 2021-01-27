import React, {useState} from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import { FaCheck, FaTimesCircle } from "react-icons/fa";
import AuthService from '../../helpers/authService';


function EventModal(props) {
    const [data, setData] = useState({name: '', date: '', time: '', location: '', description: '', createdBy: AuthService.getUsername()})
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const submitEvent = async (e) => {
        e.preventDefault();
        const result = await fetch('/api/events', {
          method: 'post',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const body = await result.json();
        console.log(body)
        if (body.success) {
            setSuccess(true)
            props.refresh()
        } else {
            setError(true)
        }
      }

    return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Create a new event
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {!success ? <Form onSubmit={submitEvent}>
            <Form.Group >
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" defaultValue={props.event.name} placeholder="First Meeting" onChange={(event) => setData({...data, name: event.target.value})} required/>
            </Form.Group>
            <Form.Group >
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Virtual" onChange={(event) => setData({...data, location: event.target.value})} required/>
            </Form.Group>
            <Form.Group >
                <Form.Label>Date</Form.Label>
                <Form.Control type="text" placeholder="August 24, 2020" onChange={(event) => setData({...data, date: event.target.value})} required/>
            </Form.Group>
            <Form.Group >
                <Form.Label>Time</Form.Label>
                <Form.Control type="text" placeholder="1:00 PM" onChange={(event) => setData({...data, time: event.target.value})} required/>
            </Form.Group>
            <Form.Group >
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="4" placeholder="First meeting of this calendar year!" onChange={(event) => setData({...data, description: event.target.value})} required/>
            </Form.Group>
            {error ?
                <Alert variant="danger"><FaTimesCircle size={25} /> An error has occured. Please try again! If this error persists, please let us know via email. </Alert>
            : null
            }
            <Button variant="outline-light" type="submit">
                Submit
            </Button>
        </Form>
        : 
        <>
            <Alert variant="success"><FaCheck /> Event created!</Alert>
            <Modal.Footer>
                <Button variant="light" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </>
        }
        </Modal.Body>
    </Modal>
    );
}

export default EventModal