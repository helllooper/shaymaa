import React, { Suspense, useState } from 'react';
import {Row, Col, Button} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
// import ReactPlayer from 'react-player';
import {deleteVideo ,videoDetails} from "../actions/videoActions"
import Loading from "./Loading";

const ReactPlayer = React.lazy(() => import("react-player"))


const Video = (props) => {
    const [loading,setLoading] = useState(true)
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
        <>
        {loading && <Loading />}
        <Row id="article" className="flex-row-reverse py-3">
            <Col xs={12} lg={3}>
                 <h3 className="fw-bold px-0">{props.title}</h3>
                 <p>{props.date.substring(0, 10)}</p>
            </Col>
            <Col xs={12} lg={5}>
                <p>{props.brief}</p>
            </Col>
            <Col xs={12} lg={4}>
             <div id="player-wrapper">
               <Suspense fallback={<p>...Loading</p>}>
                 <ReactPlayer className='react-player' width='100%' height='100%' url={props.url} controls={true} onReady={()=>setLoading(false)}/>
                 {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/NfC6eXwSJpo?autoplay=0&amp;mute=0&amp;controls=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="1"></iframe> */}
                 {/* <iframe frameBorder="0" allowFullScreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" title="YouTube video player" width="100%" height="100%" src="https://www.youtube.com/embed/NfC6eXwSJpo?autoplay=0&amp;mute=0&amp;controls=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;enablejsapi=1&amp;widgetid=1"id="widget2"></iframe> */}
               </Suspense>
             </div>
            </Col>
            { userLogin.userInfo && userLogin.userInfo.isAdmin ? (
                <div className="py-2">
                 <Button id="edit" className="mx-2" variant="success" onClick={getVideoHandler}>Edit</Button>
                 <Button id="delete" className="mx-2" variant="danger" onClick={deleteVideoHandler}>Delete</Button>
                </div>
            ):null}
        </Row>
        </>
        )
}

export default Video
