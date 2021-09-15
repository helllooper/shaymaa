import React , {useEffect} from 'react'
import { Container, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { authorDetails } from "../actions/authorActions"
import Loading from "./Loading";
import {AUTHOR_DETAILS_RESET} from "../constants/authorConstants"
import {LinkContainer} from "react-router-bootstrap"

const Author = ({history, match}) => {
    const dispatch = useDispatch();
    const {loading, author} = useSelector(state => state.authorDetails)
    useEffect(() => {
        dispatch(authorDetails(match.params.id));
        return () => {
            dispatch({type:AUTHOR_DETAILS_RESET})
        }
    },[dispatch, match.params.id])
    return (
        <Container fluid id="articleDetails" className="position-relative pt-3 ">
            {loading || !author ? <Loading />: (
                <Row className="d-flex flex-row-reverse">
                    <Col md={8}>
                        <h4 className="fw-bold">{author.name}</h4>
                        <p className="py-3 fw-bold">{author.cv}</p>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={3}>
                        <div id="latestArticles">
                        <Image src={author.url} thumbnail fluid/>
                        </div>
                    </Col>
                </Row>
            )}
        </Container>
    )
}

export default Author
