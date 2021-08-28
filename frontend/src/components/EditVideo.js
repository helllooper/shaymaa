import React, { useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button, ProgressBar} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom"
import {VIDEO_DETAILS_RESET, VIDEO_UPLOAD_RESET} from "../constants/videoConstants";
import Loading from "../components/Loading";
import {updateVideo} from "../actions/videoActions"


const EditVideo = ({location, history}) => {
    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {loading, success, video, error} = useSelector(state => state.videoDetails)
  

    useEffect(async() => {
        setTitle(video.title);
        setBrief(video.brief);
           
        return () => {
            return dispatch({type:VIDEO_DETAILS_RESET});
        }
    },[])

    const submitHandler = async(e) => {
        e.preventDefault();
        await dispatch(updateVideo({
            _id:video._id,
            title,
            brief
        }))
        history.push("/videos")
    }

    return (
        <Container id="form" className="editVideo position-relative py-5">
            {!userLogin.userInfo || !userLogin.userInfo.isAdmin ? <Redirect to="/"/>:null}
            {loading ? <Loading />:(
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
                        
                        <div className="text-center">
                            <Button type="submit" variant="outline-secondary mt-3" disabled={loading}>إرسال</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            )}
            
        </Container>
    )
}

export default EditVideo;
