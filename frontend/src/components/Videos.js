import React , {useEffect}from 'react'
import { Container } from "react-bootstrap"
import Video from "./Video";
import {useDispatch, useSelector} from "react-redux";
import {listVideos} from "../actions/videoActions";
import Loading from "./Loading";
import Paginate from "./Paginate";
import Message from "./Message";
import usePrevious from "./usePrevious";



const Videos = ({history, match, keyword, pageNumber, setPage, setNoResults}) => {
    const dispatch = useDispatch();
    if(!pageNumber){
        pageNumber = match.params.pageNumber || 1
    }
    const previousPageNumber = usePrevious(pageNumber);
    const {loading, videos, page, count} = useSelector(state => state.videoList)
    const videoDelete = useSelector(state => state.videoDelete)
    
    useEffect(() => {
        const setVideosResults = async () => {
            console.log(previousPageNumber !== pageNumber)
            if(!videos || previousPageNumber !== pageNumber){
                await dispatch(listVideos(pageNumber,keyword));
            }
            if(setNoResults && videos && videos.length === 0){
              setNoResults(true);
            }
        }
        setVideosResults();}
     ,[ dispatch, videos,setNoResults, keyword, pageNumber, videoDelete.loading])
    return (
        <>
        {loading || !videos  ? <Loading />:videos.length > 0 ? (
        <Container id="articles" className="position-relative">
                <div>
                  <h1 className="py-5">فيديوهات</h1>
                  {videos.map(video => <Video key={video._id} id={video._id}  title={video.title} brief={video.brief} url={video.url} date={video.date} history={history}/>)}
                  <Paginate list="videos" count={count} page={page} history={history} setPage={setPage}/>
                </div>
            
        </Container>
        ):keyword ? <Message variant="danger">عفوا لا توجد فيديوهات مطابقة لنتيجة البحث</Message>:<div id="superAdmin" className="position-relative"><Message variant="danger">لا توجد فيديوهات بالموقع بعد</Message></div>}
        </>
    )
}

export default Videos
