import React from 'react'
import {Row, Col, Button} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from 'react-player';
import {deleteVideo ,videoDetails} from "../actions/videoActions"

const Video = (props) => {
    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const deleteVideoHandler = () => {
        if(window.confirm("Are you sure?")){
            dispatch(deleteVideo(props.id));
        }
    }
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
            <div id="player-wrapper">
               <ReactPlayer className='react-player' width='100%' height='100%' url={props.url} controls={true} />
            </div>
           </Col>
           { userLogin.userInfo && userLogin.userInfo.isAdmin ? (
               <div className="py-2">
                <Button id="edit" className="mx-2" variant="success" onClick={getVideoHandler}>Edit</Button>
                <Button id="delete" className="mx-2" variant="danger" onClick={deleteVideoHandler}>Delete</Button>
               </div>
           ):null}
        </Row>
    )
}

export default Video
