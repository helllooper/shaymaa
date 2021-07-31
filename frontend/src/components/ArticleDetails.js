import React , {useEffect} from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { articleDetails, getLatestArticles } from "../actions/articleActions"
import Loading from "./Loading";
import {ARTICLE_DETAILS_RESET, LATEST_ARTICLES_RESET} from "../constants/articleConstants"
import parse from 'html-react-parser';
import {LinkContainer} from "react-router-bootstrap"

const ArticleDetails = ({history, match}) => {
    const dispatch = useDispatch();
    const {loading, article, error} = useSelector(state => state.articleDetails)
    const latestArticles = useSelector(state => state.latestArticles)
    useEffect(() => {
        dispatch(articleDetails(match.params.id));
        dispatch(getLatestArticles());
        return () => {
            dispatch({type:ARTICLE_DETAILS_RESET})
            dispatch({type:LATEST_ARTICLES_RESET})
        }
    },[match.params.id])
    return (
        <Container fluid id="articleDetails" className="position-relative pt-3 ">
            {loading || !latestArticles ? <Loading />: article && latestArticles.articles? (
                <Row className="d-flex flex-row-reverse">
                    <Col md={8}>
                        <h4><span className="fw-bold">{article.author}</span> | {article.date.substring(0, 10)}</h4>
                        <h2 className="py-3 fw-bold">{article.title}</h2>
                        {parse(article.text)}
                    </Col>
                    <Col md={1}></Col>
                    <Col md={3}>
                        <div id="latestArticles">
                            <h3 className="fw-bold">أحدث المقالات</h3>
                            {latestArticles.articles.map((article) => {
                                return (
                                    <LinkContainer to={`/article/${article._id}`}>
                                        <h5 className="fw-bold px-0 py-3">{article.title}</h5>
                                    </LinkContainer>
                                
                            )
                        })}
                        </div>
                    </Col>
                </Row>
            ):null}
        </Container>
    )
}

export default ArticleDetails
