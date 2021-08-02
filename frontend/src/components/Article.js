import React from 'react'
import {Row, Col, Button} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteArticle } from "../actions/articleActions";
import {NavLink} from "react-router-dom";


const Article = (props) => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const deleteArticleHandler = () => {
        dispatch(deleteArticle(props.id));
    }
    return (
        <Row id="article" className="py-3">
           <Col xs={12}>
           <LinkContainer to={`/article/${props.id}`}>
                <h3 className="fw-bold px-0 py-3">{props.title}</h3>
           </LinkContainer>
           </Col>
           <Col xs={12}>
               <p>{props.brief}</p>
           </Col>
           <Col xs={12}>
                <p>{props.author}</p>
           </Col>
           <Col xs={12}>
                <p>{props.date.substring(0, 10)}</p>
           </Col>
           { userLogin.userInfo && userLogin.userInfo.isAdmin ? (
               <div className="py-2">
                <Button id="edit" className="mx-2" variant="success"><NavLink>Edit</NavLink></Button>
                <Button id="delete" className="mx-2" variant="danger" onClick={deleteArticleHandler}>Delete</Button>
               </div>
           ):null}
        </Row>
    )
}

export default Article
