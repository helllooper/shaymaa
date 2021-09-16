import React , { useEffect}from 'react';
import { Container} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux"
import Article from "./Article";
import {getAuthorsArticles} from "../actions/authorActions";
import Loading from "./Loading";
import Message from "./Message";
import Paginate from "./Paginate";
import usePrevious from "./usePrevious";

const AuthorsArticles = ({history, match}) => {
    const dispatch = useDispatch();
    const pageNumber = match.params.pageNumber || 1
    const previousPageNumber = usePrevious(pageNumber);
    const {name, loading, articles, count, page} = useSelector(state => state.authorsArticles)
    const {loading:loadingDeleteArticle , error:errorDeleteArticle} = useSelector(state => state.articleDelete)
    useEffect(() => {
        if( loadingDeleteArticle || !articles || previousPageNumber !== pageNumber){
            dispatch(getAuthorsArticles(match.params.id, pageNumber))
          }
    //    return () => {
    //        dispatch({type:AUTHOR_ARTICLES_RESET});
    //    }
    },[dispatch,match.params.id,articles,  loadingDeleteArticle, errorDeleteArticle, pageNumber])
    return (
        <Container id="admin" className="py-5 position-relative">
            {loading || loadingDeleteArticle || !articles ? <Loading />: errorDeleteArticle ? <Message variant="danger">{errorDeleteArticle }</Message> :articles.length > 0 ?(
               <div>
                   <h1 className="py-3 fw-bold">{name}</h1>
                   <h4>مقالات الكاتب</h4>
                    {articles.map(article => <Article key={article._id} id={article._id} title={article.title} brief={article.brief} date={article.date} author={article.author} history={history}/>)}
                    <Paginate list="author" id={match.params.id} count={count} page={page} history={history}/>
               </div>
            ):<Message variant="danger">لا توجد مقالات للكاتب بعد</Message>}
        </Container>
    )
}

export default AuthorsArticles