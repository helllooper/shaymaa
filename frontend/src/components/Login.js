import React, { useState, useEffect} from 'react';
import {Container, Form, Button, Row, Col} from "react-bootstrap";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

    }
    , [])

    return (
        <Container id="login" className="postion-relative">
            <h1>Sign In</h1>
            <Form>
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
                <Button type="submit" variant="primary">Sign In</Button>
            </Form>
        </Container>
    )
}

export default Login

