import React , {useEffect}from 'react'
import { Container } from "react-bootstrap"
import Video from "./Video";
import {useDispatch, useSelector} from "react-redux";
import {listVideos} from "../actions/videoActions";
import Loading from "./Loading";
import Paginate from "./Paginate";
import Message from "./Message"

const Videos = ({history, match, keyword, pageNumber, setPage}) => {
    const dispatch = useDispatch();
    if(!pageNumber){
        pageNumber = match.params.pageNumber || 1
    }
    const {loading, videos, error, page, count} = useSelector(state => state.videoList)
    const videoDelete = useSelector(state => state.videoDelete)
    useEffect(() => {
        if(!videoDelete.loading){
            dispatch(listVideos(pageNumber, keyword));
          }
         
    }
     ,[pageNumber, videoDelete.loading])
    return (
        <Container id="articles" className="position-relative">
            {loading || !videos  ? <Loading />:videos.length > 0 ? (
                <div>
                  <h1 className="py-5">فيديوهات</h1>
                  {videos.map(video => <Video key={video._id} id={video._id}  title={video.title} brief={video.brief} url={video.url} date={video.date} history={history}/>)}
                  <Paginate list="videos" count={count} page={page} history={history} setPage={setPage}/>
                </div>
            ):<Message variant="danger">عفوا لا توجد فيديوهات مطابقة للبحث</Message>}
        </Container>
    )
}

export default Videos
