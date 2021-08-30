import React, {useState, useEffect} from 'react'
import { Button, Form } from "react-bootstrap";
import Message from "./Message";

const SearchBox = ({history, phone}) => {
    const [keyword, setKeyword] = useState("");
    const [error, setError] = useState(null);
    const submitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            setError("قم بإدخال كلمة أو أكثر للبحث")
        }
    }

    return (
        <Form id="searchBox" className={phone ? "d-flex d-md-none w-75 ms-auto":"d-none d-md-flex mx-md-3 position-absolute start-0"} onSubmit = {submitHandler}>
            <Form.Control type="text" name="q" onChange={e => setKeyword(e.target.value)} placeholder="... بحث" className="mr-sm-2 ml-sm-5"></Form.Control>
            {error && <Message variant="danger">{error}</Message>}
            <Button type="submit" variant={phone ? "success":"outline-success"} className="p-2 mx-2">بحث</Button>
        </Form>
    )
}

export default SearchBox

