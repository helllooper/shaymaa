import React from 'react'
import { Container } from "react-bootstrap"
import Article from "./Article";

const Articles = () => {
    return (
        <Container id="articles" className="position-relative">
            <h1 className="py-5">مقالات</h1>
            <Article />
            <Article />
            <Article />
        </Container>
    )
}

export default Articles
