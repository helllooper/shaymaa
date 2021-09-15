import React, { useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {createAuthor} from "../actions/authorActions";
import { Redirect } from "react-router-dom"
import Loading from "./Loading";
import Message from "./Message";
import {AUTHOR_CREATE_RESET} from "../constants/authorConstants";


const AddAuthor = ({location, history}) => {
    const [name, setName] = useState("");
    const [cv, setCv] = useState("");
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {loading, success, error} = useSelector(state => state.authorCreate)
    useEffect(() => {
        if(success){
            history.push("/");
            return () => {
                dispatch({type:AUTHOR_CREATE_RESET});
           }
        }
    }, [dispatch, history, loading, error, success])

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", name);
        data.append("cv", cv);
        data.append("image", image);
        console.log(data);
        dispatch(createAuthor(data));
    }

    return (
        <Container id="form" className="position-relative py-5">
            {!userLogin.userInfo && <Redirect to="/"/>}
            {loading ? <Loading />:(
                <Row className="justify-content-center">
                <Col xs={8} md={6}>
                    {error && <Message variant="danger">{error}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId = "name">
                            <Form.Label>اسم الكاتب</Form.Label>
                            <Form.Control 
                            type="text"  
                            value={name} 
                            onChange={(e) => setName(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "cv">
                            <Form.Label>تعريف بالكاتب</Form.Label>
                            <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={cv} 
                            onChange={(e) => setCv(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>تحميل صورة للكاتب</Form.Label>
                            <Form.Control 
                            type="file" 
                            className="form-control" 
                            onChange={e => setImage(e.target.files[0])}/>
                        </Form.Group>
                        <div className="text-center">
                            <Button type="submit" variant="outline-secondary mt-3" disabled={loading}>{loading ? "يرجى الانتظار":"إرسال"}</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            )}
        </Container>
    )
}

export default AddAuthor;
