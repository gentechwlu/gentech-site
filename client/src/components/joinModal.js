import React, {useState} from 'react';
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import { FaCheck } from "react-icons/fa";

function JoinModal(props) {
    const [info, setInfo] = useState({name: '', phone: null, email: '' });
    const [filled, setFilled] = useState(false);

    const submitForm = async (e) => {
        e.preventDefault();
        const result = await fetch(`/api/members/add`, {
            method: 'post',
            body: JSON.stringify({name: info.name, email: info.email, phone: info.phone}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const body = await result.json();
        console.log(body.message);
        setInfo({name: '', phone: null, email: '' });
        //props.onHide();
        setFilled(true);
        console.log({name: info.name, email: info.email, phone: info.phone})
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
              Fill out this form
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!filled ? <Form onSubmit={submitForm}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="John Doe" onChange={(event) => setInfo({...info, name: event.target.value})} required/>
                    <br/>
                    <Form.Label>W&L Email address</Form.Label>
                    <Form.Control type="email" placeholder="doej22@mail.wlu.edu" onChange={(event) => setInfo({...info, email: event.target.value})} required/>
                    <br/>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="number" placeholder="123-456-7890" onChange={(event) => setInfo({...info, phone: event.target.value})} required/>
                    <br/>
                </Form.Group>
                <Button variant="light" type="submit">
                    Submit
                </Button>
            </Form>
            : 
            <>
              <Alert variant="success"><FaCheck /> Form submitted! We will reach out to you soon.</Alert>
              <Modal.Footer>
                  <Button variant="light" onClick={props.onHide}>Close</Button>
              </Modal.Footer>
            </>
            }
          </Modal.Body>
        </Modal>
      );
}

export default JoinModal