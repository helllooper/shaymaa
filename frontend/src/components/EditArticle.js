import React, { useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {updateArticle} from "../actions/articleActions";
import { Redirect } from "react-router-dom";
import Loading from "./Loading";
import Message from "./Message";
import {ARTICLE_UPDATE_RESET} from "../constants/articleConstants";


const EditArticle = ({history, match}) => {
    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const dispatch = useDispatch();
    const {loading, success, article, error} = useSelector(state => state.articleDetails)
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate, article:updatedArticle} = useSelector(state => state.articleUpdate)
    const userLogin = useSelector(state => state.userLogin)
    
    useEffect(async() => {
        setTitle(article.title);
        setBrief(article.brief);
        setText(article.text);
        setAuthor(article.author);
        if(successUpdate){
            history.push(`/article/${article._id}`)
            return () => {
                dispatch({type:ARTICLE_UPDATE_RESET});
           }
        }
    },[loading, loadingUpdate, success, successUpdate])

    const submitHandler = async(e) => {
        e.preventDefault();
        dispatch(updateArticle({
            _id:article._id,
            title,
            brief,
            text,
            author
        }))
    }

    return (
        <Container id="form" className="position-relative py-5">
            {!userLogin.userInfo || !userLogin.userInfo.isAdmin ? <Redirect to="/"/>:null}
            {loading || loadingUpdate  ? <Loading />:(
                <Row className="justify-content-center">
                <Col xs={8} md={6}>
                    {(error || errorUpdate) && <Message variant="danger">{error || errorUpdate}</Message>}
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
                        <Form.Group controlId = "text">
                            <Form.Label>المقالة</Form.Label>
                            <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={text} 
                            onChange={(e) => setText(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId = "author">
                            <Form.Label>الكاتب</Form.Label>
                            <Form.Control 
                            type="text"  
                            value={author} 
                            onChange={(e) => setAuthor(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <div className="text-center">
                            <Button type="submit" variant="outline-secondary mt-3">إرسال</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            )}
        </Container>
    )
}

export default EditArticle;
