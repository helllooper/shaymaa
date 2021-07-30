import React, { useState, useEffect} from 'react';
import {Container, Form, Button, Row, Col} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { register } from "../actions/userActions"


const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch();

    useEffect(() => {

    }
    , [])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            console.log("Passwords do not match");
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <div id="admin" className="d-flex align-items-center">
        <Container id="login" className="postion-relative text-start">
            <h1>Sign Up</h1>
            <Form onSubmit = {submitHandler}>
            <Form.Group controlId = "name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter A Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId = "email">
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter An Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId = "password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Enter A Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId = "confirmPassword">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="my-3" variant="success">Sign In</Button>
            </Form>
        </Container>
        </div>
    )
}

export default Signup

