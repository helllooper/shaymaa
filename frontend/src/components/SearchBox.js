import React, {useState} from 'react'
import { Button, Form, Nav } from "react-bootstrap";
import Message from "./Message";

const SearchBox = ({history, phone}) => {
    const [keyword, setKeyword] = useState("");
    const [error, setError] = useState(null);
    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/search?keyword=${keyword}`)
        } else {
            setError("قم بإدخال كلمة أو أكثر للبحث")
        }
    }

    return (
        <Form id="searchBox" className={phone ? "d-flex d-lg-none w-75 ms-auto":"d-none d-lg-flex mx-lg-3 position-absolute w-25 start-0"} onSubmit = {submitHandler}>
            <Form.Control type="text" name="q" onChange={e => setKeyword(e.target.value)} placeholder="... بحث" className="mr-sm-2 ml-sm-5"></Form.Control>
            {error && <Message variant="danger">{error}</Message>}
            <Nav.Link eventKey="9" as={Button} type="submit" variant="success" className="p-2 mx-2">بحث</Nav.Link>
        </Form>
    )
}

export default SearchBox

