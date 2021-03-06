import React, { useState, useEffect} from 'react';
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {createArticle} from "../actions/articleActions";
import {listAuthors} from "../actions/authorActions"
import { Redirect } from "react-router-dom"
import Loading from "./Loading";
import Message from "./Message";
import {ARTICLE_CREATE_RESET} from "../constants/articleConstants";


const AddArticle = ({location, history}) => {
    const [title, setTitle] = useState("");
    const [brief, setBrief] = useState("");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const {loading, success, error} = useSelector(state => state.articleCreate)
    const {loading:loadingAuthors, success:successAuthors,authors, error:errorAuthors} = useSelector(state=>state.authorList)
    useEffect(() => {
        if(success){
            history.push("/articles");
            return () => {
                dispatch({type:ARTICLE_CREATE_RESET});
           }
        }
        dispatch(listAuthors());
    }, [dispatch, history, loading, error, success])

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(createArticle({
            title,
            brief,
            text,
            author
        }))
    }

    return (
        <Container id="form" className="position-relative py-5">
            {!userLogin.userInfo && <Redirect to="/"/>}
            {loading || loadingAuthors ? <Loading />:(
                <Row className="justify-content-center">
                <Col xs={8} md={6}>
                    {error && <Message variant="danger">{error}</Message>}
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
                        {/* <Form.Select onChange={(e)=>setAuthor(e.target.value)}>
                            <option>الكاتب</option>
                            {authors && authors.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}
                        </Form.Select> */}
                        <Form.Group controlId="formGridState">
                            <Form.Label>الكاتب</Form.Label>
                            <select dir="rtl" value={author} onChange={(e) => setAuthor(e.target.value)}  className="form-select" aria-label="Default select example">
                            <option>قائمة الكتاب</option>
                            {authors && authors.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}
                            </select>
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

export default AddArticle;
