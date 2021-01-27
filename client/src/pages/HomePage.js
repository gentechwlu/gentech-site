import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import logo from '../images/logo.png';
import Events from '../components/events';
import TheTeam from '../components/theTeam';
import '../App.css';
import Typist from 'react-typist';
//const axios = require('axios');

class HomePage extends React.Component {

    render () {
      return (
        <>
          <Container fluid>
            <br/>
              <Row id="intro">
                <Col className="m-auto" lg={6} md={12} style={{padding: 0}}>
                  <img className="logo mx-auto d-block" src = {logo} alt="GenTech logo" style={{maxWidth: "100%"}}/>
                </Col>
                <Col className="m-auto" lg={6} md={12}>
                  <h2 style={{fontSize: "50px"}}>Empowering the community through <Typist avgTypingDelay={160} cursor={{blink: true, hideWhenDone: true, hideWhenDoneDelay: 1000, element: '_'}}>
                      Technology
                      </Typist>
                    </h2>
                  <br/>
                </Col>
              </Row>
          </Container>
          <Events />
          <TheTeam />
        </>
      );
    }
  }
  
  
  export default HomePage;
