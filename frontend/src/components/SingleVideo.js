import React from 'react'
import {Row, Col, Button} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Video, Transformation, CloudinaryContext} from 'cloudinary-react';


const SingleVideo = (props) => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    // const deleteArticleHandler = () => {
    //     if(window.confirm("Are you sure?")){
    //         dispatch(deleteArticle(props.id));
    //     }
    // }
    return (
        <Row id="article" className="py-3">
           <Col xs={12}>
                <h3 className="fw-bold px-0 py-3">{props.title}</h3>
           </Col>
           <Col xs={12}>
               <p>{props.brief}</p>
           </Col>
           <Col xs={12}>
                <p>{props.date.substring(0, 10)}</p>
           </Col>
           <Col>
              <Video cloudName="dp3abctzf" secure={true} publicId={props.publicId}>
                  <Transformation overlay="text:arial_60:watchme" gravity="north" y="20" />
              </Video>
           </Col>
           { userLogin.userInfo && userLogin.userInfo.isAdmin ? (
               <div className="py-2">
                <Button id="delete" className="mx-2" variant="danger">Delete</Button>
               </div>
           ):null}
        </Row>
    )
}

export default SingleVideo
