// Header.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

const Header = () => {
    return (
        <div className="logo">
            <Row>
                <Col>
                    <img src={logo} alt="Logo" width="200px" />
                </Col>
                <Col>
                    <h1>Weather App</h1>
                </Col>
            </Row>
        </div>
    );
};

export default Header;

