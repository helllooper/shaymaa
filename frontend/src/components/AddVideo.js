import React, { useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {createArticle} from "../actions/articleActions";
import { Redirect } from "react-router-dom"

const AddVideo = ({location, history}) => {
    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const [video, setVideo] = useState("");
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)

    const submitHandler = async (e) => {}

    return (
        <Container id="form" className="position-relative py-5">
            {!userLogin.userInfo && <Redirect to="/"/>}
            <Row className="justify-content-center">
                <Col xs={8} md={6}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId = "title">
                            <Form.Label>العنوان</Form.Label>
                            <Form.Control 
                            type="text"  
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "brief">
                            <Form.Label>مقدمة</Form.Label>
                            <Form.Control 
                            type="text"  
                            value={brief} 
                            onChange={(e) => setBrief(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>تحميل فيديو</Form.Label>
                            <Form.Control 
                            type="file" 
                            className="form-control"
                            value={video} 
                            onChange={(e) => setVideo(e.target.value)}/>
                        </Form.Group>
                        <div className="text-center">
                            <Button type="submit" variant="outline-secondary mt-3">إرسال</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddVideo;
