import React , {useEffect}from 'react'
import { Container } from "react-bootstrap"
import Video from "./Video";
import {useDispatch, useSelector} from "react-redux";
import {listVideos} from "../actions/videoActions";
import Loading from "./Loading";
import Paginate from "./Paginate";

const Videos = ({history, match}) => {
    const dispatch = useDispatch();
    const pageNumber = match.params.pageNumber || 1
    const {loading, videos, error, page, pages} = useSelector(state => state.videoList)
    // const articleDelete = useSelector(state => state.articleDelete)
    useEffect(() => {
         dispatch(listVideos(pageNumber));
    }
     ,[pageNumber])
    return (
        <Container id="articles" className="position-relative">
            {loading  ? <Loading />:videos ? (
                <div>
                  <h1 className="py-5">فيديوهات</h1>
                  {videos.map(video => <Video key={video._id} id={video._id}  title={video.title} brief={video.brief} url={video.url} date={video.date} history={history}/>)}
                  <Paginate page={page} pages={pages}/>
                </div>
            ):null}
        </Container>
    )
}

export default Videos
