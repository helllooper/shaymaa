import React, { useState, useEffect} from 'react';
import {Container, Form, Button, Row, Col} from "react-bootstrap";
import { useDispatch} from "react-redux";
import { login } from "../actions/userActions";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    useEffect(() => {

    }
    , [])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <div id="admin" className="d-flex align-items-center">
        <Container id="login" className="postion-relative text-start">
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId = "email">
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId = "password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="my-3" variant="success">Sign In</Button>
            </Form>
        </Container>
        </div>
    )
}

export default Login

