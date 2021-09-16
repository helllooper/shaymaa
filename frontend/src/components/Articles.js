import React , {useEffect}from 'react'
import { Container } from "react-bootstrap"
import Article from "./Article";
import {useDispatch, useSelector} from "react-redux";
import {listArticles} from "../actions/articleActions";
import Loading from "./Loading";
import Paginate from "./Paginate";
import Message from "./Message";
import usePrevious from "./usePrevious";


const Articles = ({history, match, keyword, pageNumber, setPage, setNoResults}) => {
    const dispatch = useDispatch();
    if(!pageNumber){
      pageNumber = match.params.pageNumber || 1
    }
    const previousPageNumber = usePrevious(pageNumber);
    const {loading, articles, page, count} = useSelector(state => state.articleList)
    const articleDelete = useSelector(state => state.articleDelete)
    
    useEffect(() => {
      const setArticlesResults = async () => {
        if( articleDelete.loading || !articles || previousPageNumber !== pageNumber){
          await dispatch(listArticles(pageNumber,keyword));
        }
        if(setNoResults && articles && articles.length === 0){
          setNoResults(true);
        }
    }
        setArticlesResults()
    }
     ,[ dispatch,articles, setNoResults, keyword, pageNumber, articleDelete.loading])
    return (
      <>
      {loading || articleDelete.loading || !articles ? <Loading />:articles.length > 0 ? (
        <Container id="articles" className="position-relative">
                <div>
                  <h1 className="py-5">مقالات</h1>
                  {articles.map(article => <Article key={article._id} id={article._id} title={article.title} brief={article.brief} author={article.author} date={article.date} history={history}/>)}
                  <Paginate list="articles" count={count} page={page} history={history} setPage={setPage}/>
                </div>
            
        </Container>
      ):keyword ? <div id="message" className="position-relative"><Message  variant="danger">عفوا لا توجد مقالات مطابقة للبحث</Message></div>:<div id="superAdmin" className="position-relative"><Message variant="danger">لا توجد مقالات بالموقع بعد</Message></div>}
      </>
    )
}

export default Articles
