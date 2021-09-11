import React, { useState, useEffect} from 'react';
import {Container, Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions"
import Loading from "./Loading";
import Message from "./Message";

const Signup = ({history, match}) => {
    const {loading, error,success, userInfo} = useSelector(state => state.userLogin)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [secretWord, setSecretWord] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if(success){
            history.push("/");
          }
    }, [history, loading, userInfo, error, success])

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(register(name, email, password,confirmPassword, secretWord))
    }

    return (
        <div id="admin" className="d-flex align-items-center">
        {loading ? <Loading />:(
        <Container id="login" className="postion-relative text-start">
            <h1>Sign Up</h1>
            {error && <Message variant="danger">{error}</Message>}
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
                <Form.Group controlId = "secretword">
                    <Form.Label>Secret word</Form.Label>
                    <Form.Control 
                    type="password" 
                    placeholder="Enter the secret word" 
                    value={secretWord} 
                    onChange={(e) => setSecretWord(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" className="my-3" variant="success">Sign In</Button>
            </Form>
        </Container>
        )}
        </div>
    )
}

export default Signup

