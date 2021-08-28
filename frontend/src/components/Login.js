import React, { useState, useEffect} from 'react';
import {Container, Form, Button, Nav} from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import { login } from "../actions/userActions";
import { NavLink } from "react-router-dom";
import Loading from "./Loading";
import Message from "./Message";

const Login = ({history, match}) => {
    const {loading, error,success, userInfo} = useSelector(state => state.userLogin)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    useEffect(() => {
        if(success){
            history.push("/");
          }
    }, [loading, userInfo, error, success])

    return (
        <div id="admin" className="d-flex align-items-center">
        <Container id="login" className="postion-relative text-start">
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading ? <Loading />:(
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
                <NavLink className="d-block" to="/enterEmail">Forgot password?</NavLink>
            </Form>
            )}
            
        </Container>
        </div>
    )
}

export default Login

