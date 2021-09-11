import React , { useEffect}from 'react';
import { Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux"
import Article from "./Article";
import Video from "./Video";
import {getUser} from "../actions/userActions";
import Loading from "./Loading";
import Message from "./Message";
import {USER_GET_RESET} from "../constants/userConstants"

const Admin = ({history, match}) => {
    const dispatch = useDispatch();
    const {loading, user, error} = useSelector(state => state.userDetails)
    const {loading:loadingDeleteArticle , error:errorDeleteArticle} = useSelector(state => state.articleDelete)
    const {loading:loadingDeleteVideo , error:errorDeleteVideo} = useSelector(state => state.videoDelete)
    useEffect(() => {
       dispatch(getUser(match.params.id))
       return () => {
           dispatch({type:USER_GET_RESET});
       }
    },[dispatch,match.params.id, error, loadingDeleteArticle, errorDeleteArticle,loadingDeleteVideo, errorDeleteVideo])
    return (
        <Container id="admin" className="py-5 position-relative text-start">
            {loading || loadingDeleteArticle || loadingDeleteVideo ? <Loading />: (error || errorDeleteArticle || errorDeleteVideo) ? <Message>{error || errorDeleteArticle || errorDeleteVideo}</Message> :(
               <div>
                   <h1 className="py-3 fw-bold">{user.name}</h1>
                   <h4>Articles:</h4>
                       {user.articles.map(article => <Article id={article._id} title={article.title} brief={article.brief} date={article.date} author={article.author} history={history}/>)}
                   <h4 className="py-5">Videos:</h4>
                   {user.videos.map(video => <Video id={video._id} title={video.title} brief={video.brief} date={video.date} url={video.url} history={history}/>)}
               </div>
            )}
        </Container>
    )
}

export default Admin
