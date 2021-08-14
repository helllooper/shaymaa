import React from 'react'
import {Row, Col, Button} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from 'react-player';
import {videoDetails} from "../actions/videoActions"

const Video = (props) => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    // const deleteArticleHandler = () => {
    //     if(window.confirm("Are you sure?")){
    //         dispatch(deleteArticle(props.id));
    //     }
    // }
    const getVideoHandler = async() => {
        await dispatch(videoDetails(props.id));
        props.history.push("/editVideo");
    }
    return (
        <Row id="article" className="flex-row-reverse py-3">
           <Col xs={12} lg={3}>
                <h3 className="fw-bold px-0 py-3">{props.title}</h3>
                <p>{props.date.substring(0, 10)}</p>
           </Col>
           <Col xs={12} lg={5}>
               <p>{props.brief}</p>
           </Col>
           <Col xs={12} lg={4}>
           <ReactPlayer width="100%" height="auto" url={props.url} controls={true} style={{width:"100%"}} config={{
               youtube:{
                embedOptions:{
                    height:"206px",
                    width:"100%"
                }
               }
           }}/>
           </Col>
           { userLogin.userInfo && userLogin.userInfo.isAdmin ? (
               <div className="py-2">
                <Button id="edit" className="mx-2" variant="success" onClick={getVideoHandler}>Edit</Button>
                <Button id="delete" className="mx-2" variant="danger">Delete</Button>
               </div>
           ):null}
        </Row>
    )
}

export default Video
