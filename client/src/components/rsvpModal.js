import React, {useState} from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import { FaCheck } from "react-icons/fa";

function RsvpModal(props) {
    const [email, setEmail] = useState('');
    const [filled, setFilled] = useState(false);

    const submitRsvp = async (e) => {
      e.preventDefault();
      const result = await fetch(`/api/events/${props.event._id}/rsvp`, {
        method: 'post',
        body: JSON.stringify({rsvp: email}),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      //const body = await result.json();
      setEmail('');
      //props.onHide();
      setFilled(true);
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
              RSVP to {props.event.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!filled ? <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>W&L Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
                </Form.Group>
                <Button variant="light" type="submit" onClick={submitRsvp}>
                    Submit
                </Button>
            </Form>
            : 
            <>
              <Alert variant="success"><FaCheck /> RSVP Successful. We look forward to seeing you there!</Alert>
              <Modal.Footer>
                <Button variant="light" onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </>
            }
          </Modal.Body>
        </Modal>
      );
}

export default RsvpModal