import React, { useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button, ProgressBar} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../actions/videoActions"
import { Redirect } from "react-router-dom"

const AddVideo = ({location, history}) => {
    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const [video, setVideo] = useState("");
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {loading, success} = useSelector(state => state.videoUpload)


    const uploadVideoHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("brief", brief);
        formData.append("video", video);
        dispatch(uploadVideo(formData, setUploadPercentage));
    }

    useEffect(() =>{

    },[uploadPercentage, loading, success])

    return (
        <Container id="form" className="position-relative py-5">
            {!userLogin.userInfo && <Redirect to="/"/>}
            <Row className="justify-content-center">
                <Col xs={8} md={6}>
                    <Form onSubmit={uploadVideoHandler}>
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
                            onChange={e => setVideo(e.target.files[0])}/>
                        </Form.Group>
                        <div className="text-center">
                            <Button type="submit" variant="outline-secondary mt-3" disabled={loading}>إرسال</Button>
                        </div>
                        { loading ? <ProgressBar label={`${uploadPercentage}%`} now={uploadPercentage} variant="success" className="my-3"/>:null}
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddVideo;
