import React, { useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button, ProgressBar} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../actions/videoActions"
import { Redirect } from "react-router-dom"
import Message from "./Message";
import {VIDEO_UPLOAD_RESET} from "../constants/videoConstants";


const AddVideo = ({location, history}) => {
    const [type, setType] = useState("cloudinary");
    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const [video, setVideo] = useState("");
    const [url, setUrl] = useState("");
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {loading, success, message, error} = useSelector(state => state.videoUpload)


    const uploadVideoHandler = async (e) => {
        e.preventDefault();
        let data;
        if(type === "cloudinary"){
            data = new FormData();
            data.append("title", title);
            data.append("brief", brief);
            data.append("video", video);
            console.log(data);
        }
        else if(type === "youtube"){
                data = {
                title,
                brief,
                url
            }
        }
        dispatch(uploadVideo(data, type, setUploadPercentage));
    }

    useEffect(() =>{
        if(success){
            history.push("/videos");
            return () => {
                dispatch({type:VIDEO_UPLOAD_RESET});
           }
        }
    },[dispatch, history, uploadPercentage, loading, success, type])

    return (
        <Container id="form" className="position-relative py-5">
            {!userLogin.userInfo && <Redirect to="/"/>}
            <Row className="justify-content-center">
                <Col xs={8} md={6}>
                {error && <Message variant="danger">{error}</Message>}
                    <Form onSubmit={uploadVideoHandler}>
                        <Form.Group controlId="formGridState">
                            <Form.Label>نوع الفيديو</Form.Label>
                            <select dir="rtl" value={type} onChange={(e) => setType(e.target.value)}  className="form-select" aria-label="Default select example">
                                <option value="cloudinary">حصري</option>
                                <option value="youtube">يوتيوب</option>
                            </select>
                        </Form.Group>
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
                        {type === "cloudinary" ? (
                            <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>تحميل فيديو</Form.Label>
                            <Form.Control 
                            type="file" 
                            className="form-control" 
                            onChange={e => setVideo(e.target.files[0])}/>
                        </Form.Group>
                        ): type === "youtube" ? (
                            <Form.Group controlId = "title">
                            <Form.Label>رابط الفيديو</Form.Label>
                            <Form.Control 
                            type="text"  
                            value={url} 
                            onChange={(e) => setUrl(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        ):null}
                        
                        <div className="text-center">
                            <Button type="submit" variant="outline-secondary mt-3" disabled={loading}>{loading ? "يرجى الانتظار":"إرسال"}</Button>
                        </div>
                        { loading ? <ProgressBar label={`${uploadPercentage}%`} now={uploadPercentage} variant="success" className="my-3"/>:null}
                        {message && <Message variant="success">{message}</Message> }
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default AddVideo;
