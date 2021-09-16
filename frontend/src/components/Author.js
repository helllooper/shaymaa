import React , {useEffect} from 'react'
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { authorDetails, getLatestArticle } from "../actions/authorActions"
import Loading from "./Loading";
import {AUTHOR_DETAILS_RESET} from "../constants/authorConstants"
import Article from "./Article"
import Message from "./Message"
import { Link } from 'react-router-dom';

const Author = ({history, match}) => {
    const dispatch = useDispatch();
    const {loading, author} = useSelector(state => state.authorDetails)
    const {loading:loadingLatestArticle, article, message} = useSelector(state => state.latestArticle)

    useEffect(() => {
        const getAuthorInfo = async() =>{
            await dispatch(authorDetails(match.params.id));
            dispatch(getLatestArticle(match.params.id)); 
        }
        getAuthorInfo();
        return () => {
            dispatch({type:AUTHOR_DETAILS_RESET})
        }
    },[dispatch, match.params.id])
    return (
        <Container fluid id="articleDetails" className="position-relative pt-3 ">
            {loading || !author || loadingLatestArticle ? <Loading />: (
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
                    <h4>أحدث مقالات الكاتب</h4>
                    {message ? <Message variant="danger">{message}</Message>:article ? <Article id={article._id} title={article.title} brief={article.brief} author={article.author} date={article.date} history={history}/>:null}
                    {article ? <div><Button id="readMore" variant="primary" as={Link} to={`/author/${match.params.id}/${1}`} className="fw-bold my-3" size="lg"> المزيد من المقالات للكاتب</Button></div>:null}
                </Row>
            )}
        </Container>
    )
}

export default Author
