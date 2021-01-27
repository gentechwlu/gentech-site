import React, { useState } from 'react';
import { Container, Col, Row, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { FaTimesCircle } from "react-icons/fa";
import {useHistory} from 'react-router';
import AuthService from '../helpers/authService'

function AdminAuthPage() {
    const history = useHistory()
    const [data, setData] = useState({name: '', email: '', password: '', isLoading: false, signIn: false, error: false, errorMessage: ''});
    
    const submitForm = async (e) => {
        e.preventDefault();
        setData({...data, isLoading: true, error: false});
        var result;
        if (data.signIn) {
            result = await fetch(`/api/admin/signin`, {
                method: 'post',
                body: JSON.stringify({email: data.email, password: data.password}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } else {
            result = await fetch(`/api/admin/signup`, {
                method: 'post',
                body: JSON.stringify({name: data.name, email: data.email, password: data.password}),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        }
        const body = await result.json();
        if (data.signIn && body.success) {
            //If we are signing in, and it is successful, then get the token
            const {token} = body;
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("user", JSON.stringify(body));
            history.push('/admin/dashboard')
        } 
        setData({...data, isLoading: false});
        if (body.success) {
            console.log(body.message);
            setData({name: '', email: '', password: '', signIn: true});
        } else {
            setData({...data, error: true, errorMessage: body.message});
        }
        console.log(body)
        
    }
    
    return (
        <Container fluid >
            <Row>
                <Col>
                {!data.signIn ? <h2 style={{textAlign:"center"}}>Admin Sign Up</h2>
                :<h2 style={{textAlign:"center"}}>Admin Sign In</h2>
                }
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form className="signUp" onSubmit={submitForm}>
                        {!data.signIn ? 
                            <Form.Group controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" onChange={(event) => setData({...data, name: event.target.value})} required/>
                            </Form.Group>
                            : null
                        }
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(event) => setData({...data, email: event.target.value})} required/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(event) => setData({...data, password: event.target.value})} required/>
                        </Form.Group>
                        {data.error ?
                        <Alert variant="danger"><FaTimesCircle size={25} /> {data.errorMessage} </Alert>
                        : null
                        }
                        
                        {!data.signIn ?
                        <Button variant="outline-dark" type="submit" style={{width: '100%', padding: '10px'}}>
                            {data.isLoading ? <Spinner animation="border" variant="light" />
                            : <span>CREATE ACCOUNT</span>}
                        </Button>
                        :<Button variant="outline-dark" type="submit" style={{width: '100%', padding: '10px'}}>
                            {data.isLoading ? <Spinner animation="border" variant="light" />
                            : <span>LOG IN</span>}
                        </Button>    
                        }

                        {!data.signIn ?
                        <h6 style={{padding: '10px'}}>
                            Already have an account? <a href="#" onClick={() => setData({...data, signIn: true, error: false})}>Sign in here.</a>
                        </h6>
                        :<h6 style={{padding: '10px'}}>
                            Don't have an account? <a href="#"  onClick={() => setData({...data, signIn: false, error: false})}>Sign up here.</a>
                        </h6>
                        }
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAuthPage
