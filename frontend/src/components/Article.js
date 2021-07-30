import React from 'react'
import {Nav, Row, Col} from "react-bootstrap"

const Article = (props) => {
    return (
        <Row id="article" className="pt-3">
           <Col xs={12}>
           <Nav.Item>
                <h3><Nav.Link className="aim px-0" href="#">{props.title}</Nav.Link></h3>
           </Nav.Item>
           </Col>
           <Col xs={12}>
               <p>{props.brief}</p>
           </Col>
           <Col xs={12}>
                <p>{props.author}</p>
           </Col>
           <Col xs={12}>
                <p>{props.date.substring(0, 10)}</p>
           </Col>
        </Row>
    )
}

export default Article
