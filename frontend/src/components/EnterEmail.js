import React, {useState} from 'react'
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

const EnterEmail = () => {
    const[email, setEmail] = useState("");
    const submitFormHandler = async (e) => {
        e.preventDefault();
        const data = await axios.post("/api/users/forgot-password", {email});
        console.log(data);
    }
    return (
        <div id="enterEmail" className="d-flex align-items-center position-relative text-start">
            <Container id="emailInput">
            <Form onSubmit={submitFormHandler}>
            <Form.Group controlId = "email">
                    <Form.Label>Enter your email Adress</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button className="my-3" type="submit" variant="success">Submit</Button>
            </Form>
            </Container>
        </div>
    )
}

export default EnterEmail
