import React from 'react'
import { Row, Col } from 'react-bootstrap'
import footerLogo from '../images/footer.png'
import {IoIosMail, IoLogoInstagram, IoLogoLinkedin} from "react-icons/io";

function Footer() {
    return (
            <footer>
                <Row style={{margin: "auto"}}>
                    <Col className="m-auto" lg={6} md={12} style={{padding: 0}}>
                        <img className="logo mx-auto d-block" src = {footerLogo} alt="GenTech logo" style={{maxWidth: "80%"}}/>
                    </Col>
                    <Col className="m-auto">
                        <div className="icons">
                            <a href="https://www.linkedin.com/company/gentech-official"><IoLogoLinkedin size="55px" style={{color: "white"}}/></a>
                            <a href="https://www.instagram.com/gentechwlu"><IoLogoInstagram size="55px" style={{color: "white"}}/></a>
                            <a href="mailto:gentech@mail.wlu.edu"><IoIosMail size="55px" style={{color: "white"}}/></a>
                            
                        </div>
                    </Col>
                </Row>
                <Row style={{margin: "auto"}}>
                    <Col>
                        <p className="copyright">GenTech &copy; 2020</p>
                    </Col>
                </Row>
            </footer>
    )
}

export default Footer
