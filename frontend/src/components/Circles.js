import React from 'react'
import {Container, Row, Col, Card} from "react-bootstrap";

const Circles = () => {
    return (
        <Container className="portion1 position-relative" fluid>
            <h1 className="text-center">ما هي أهدافنا</h1>
            <Row className="align-items-start">
                <Col className="position-relative px-0" lg={3}>
                    <div className="dummy"></div>
                       <div id="element1" className="element">
                    </div>
                </Col>
                <Col className="position-relative px-0" lg={4}>
                    <div className="dummy"></div>
                       <div id="element2" className="element">
                    </div>                    
                </Col>
                <Col className="position-relative px-0" lg={5}>
                    <div className="dummy"></div>
                       <div id="element3" className="element">
                    </div>                
                </Col>
            </Row>
        </Container>
    )
}

export default Circles
