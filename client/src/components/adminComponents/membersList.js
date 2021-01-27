import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap';


const MembersList = () => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('../api/members');
            const body = await result.json()
            setMembers(body);
        }
        fetchData();
        console.log(members)
    }, [])

    return (
        <Container fluid>
            <Row>
                <Col className="container-title">
                    <h1>Members</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table className='m-auto' striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                members.map((member, key) => (
                                    <tr key={key}>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>{member.phone}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default MembersList;